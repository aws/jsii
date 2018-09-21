using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using Amazon.JSII.Generator.Class;
using Amazon.JSII.Generator.Enum;
using Amazon.JSII.Generator.Interface;
using Amazon.JSII.JsonModel.FileSystem;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using Type = Amazon.JSII.JsonModel.Spec.Type;
using TypeKind = Amazon.JSII.JsonModel.Spec.TypeKind;

namespace Amazon.JSII.Generator
{
    public class AssemblyGenerator
    {
        readonly string _outputRoot;
        readonly IFileSystem _fileSystem;

        public AssemblyGenerator(
            string outputRoot,
            IFileSystem fileSystem = null
        )
        {
            _outputRoot = outputRoot ?? throw new ArgumentNullException(nameof(outputRoot));
            _fileSystem = fileSystem ?? new FileSystem();
        }

        public void Generate(string jsiiFile, string tarballPath, ISymbolMap symbols = null)
        {
            jsiiFile = jsiiFile ?? throw new ArgumentNullException(nameof(jsiiFile));
            symbols = symbols ?? new SymbolMap();

            string assemblyJson = _fileSystem.File.ReadAllText(jsiiFile);
            Assembly assembly = JsonConvert.DeserializeObject<Assembly>(assemblyJson);
            symbols.Add(assembly);

            LoadDependencies(assembly, Path.GetDirectoryName(jsiiFile));

            string packageOutputRoot = Path.Combine(_outputRoot, assembly.GetNativePackageId());
            if (_fileSystem.Directory.Exists(packageOutputRoot))
            {
                _fileSystem.Directory.Delete(packageOutputRoot, true);
            }
            _fileSystem.Directory.CreateDirectory(packageOutputRoot);

            // On Windows, the full destination path including the filename is required.
            _fileSystem.File.Copy(tarballPath, Path.Combine(packageOutputRoot, Path.GetFileName(tarballPath)));
            _fileSystem.File.Copy(jsiiFile, Path.Combine(packageOutputRoot, Path.GetFileName(jsiiFile)));

            Save(packageOutputRoot, symbols, assembly, new FileInfo(tarballPath).Name, new FileInfo(jsiiFile).Name);

            void LoadDependencies(DependencyRoot dependencyRoot, string packageDirectory)
            {
                if (dependencyRoot.Dependencies == null)
                {
                    return;
                }

                foreach (KeyValuePair<string, PackageVersion> entry in dependencyRoot.Dependencies)
                {
                    string depRoot = ResolvePackage(entry.Key, packageDirectory);
                    string depFile = Path.Combine(depRoot, ".jsii");
                    string depJson = _fileSystem.File.ReadAllText(depFile);
                    Assembly depAssembly = JsonConvert.DeserializeObject<Assembly>(depJson);
                    symbols.Add(depAssembly);
                    LoadDependencies(depAssembly, depRoot);
                }

                string ResolvePackage(string packageName, string directory)
                {
                    if (string.IsNullOrEmpty(directory))
                    {
                        throw new FileNotFoundException($"Could not resolve package named {packageName}");
                    }
                    string candidate = Path.Combine(directory, "node_modules", packageName);
                    if (_fileSystem.Directory.Exists(candidate))
                    {
                        return candidate;
                    }
                    return ResolvePackage(packageName, Path.GetDirectoryName(directory));
                }
            }
        }

        void Save(string packageOutputRoot, ISymbolMap symbols, Assembly assembly, string tarballFileName, string jsiiFileName)
        {
            if (assembly.Docs != null)
            {
                // TODO: Use Microsoft.Extensions.Logging instead of Console.Error.
                Console.Error.WriteLine($"Warning: Ignoring documentation comment on assembly {assembly.Name}. Assembly-level documentation comments are not supported for .NET");
            }

            SaveProjectFile();
            SaveAssemblyInfo(assembly.Name, assembly.Version, tarballFileName);
            SaveDependencyAnchorFile();

            foreach (Type type in assembly.Types?.Values ?? Enumerable.Empty<Type>())
            {
                SaveType(type);
            }

            void SaveProjectFile()
            {
                XElement project =
                    new XElement("Project",
                        new XAttribute("Sdk", "Microsoft.NET.Sdk"),
                        new XElement("PropertyGroup", assembly.GetMsBuildProperties()),
                        new XElement("ItemGroup",
                            new XElement("EmbeddedResource",
                                new XAttribute("Include", tarballFileName)
                            )
                        ),
                        new XElement("ItemGroup",
                            new XElement("PackageReference",
                                new XAttribute("Include", "Amazon.JSII.Runtime"),
                                new XAttribute("Version", JsiiVersion.Version)
                            ),
                            GetDependencies()
                                .Distinct()
                                .Select(d => new { Package = symbols.GetAssemblyName(d.Key), d.Value.Version})
                                .Select(d =>
                                    new XElement("PackageReference",
                                        new XAttribute("Include", d.Package),
                                        new XAttribute("Version", d.Version)
                                    )
                                )
                        )
                    );

                if (!_fileSystem.Directory.Exists(packageOutputRoot))
                {
                    _fileSystem.Directory.CreateDirectory(packageOutputRoot);
                }

                // Save to StringBuilder instead of directly to path, so that we can
                // redirect the output through the filesystem shim. Project files are
                // small, so this shouldn't be a memory hog.
                StringBuilder builder = new StringBuilder();
                XmlWriterSettings settings = new XmlWriterSettings
                {
                    // Visual Studio omits the XML declaration when creating project files, so we do too.
                    OmitXmlDeclaration = true,
                    // Visual Studio indents project files (they are often edited by hand), so we do too.
                    Indent = true,
                };
                using (XmlWriter writer = XmlWriter.Create(builder, settings))
                {
                    project.Save(writer);
                }

                string csProjPath = Path.Combine(packageOutputRoot, $"{assembly.GetNativePackageId()}.csproj");
                _fileSystem.File.WriteAllText(csProjPath, builder.ToString());

                IEnumerable<KeyValuePair<string, PackageVersion>> GetDependencies()
                {
                    foreach (KeyValuePair<string, PackageVersion> dependency in GetDependenciesCore(assembly))
                    {
                        yield return dependency;
                    }

                    IEnumerable<KeyValuePair<string, PackageVersion>> GetDependenciesCore(DependencyRoot root)
                    {
                        if (root.Dependencies == null)
                        {
                            yield break;
                        }
                        foreach (var kvp in root.Dependencies)
                        {
                            yield return kvp;
                            foreach (KeyValuePair<string, PackageVersion> dependency in GetDependenciesCore(kvp.Value))
                            {
                                yield return dependency;
                            }
                        }
                    }
                }
            }

            void SaveDependencyAnchorFile()
            {
                string anchorNamespace = $"{assembly.GetNativeNamespace()}.Internal.DependencyResolution";
                var syntaxTree = SF.SyntaxTree(
                    SF.CompilationUnit(
                        SF.List<ExternAliasDirectiveSyntax>(),
                        SF.List<UsingDirectiveSyntax>(),
                        SF.List<AttributeListSyntax>(),
                        SF.List<MemberDeclarationSyntax>(new[] {
                            SF.NamespaceDeclaration(
                                SF.IdentifierName(anchorNamespace),
                                SF.List<ExternAliasDirectiveSyntax>(),
                                SF.List<UsingDirectiveSyntax>(),
                                SF.List(new MemberDeclarationSyntax[] { GenerateDependencyAnchor() })
                            )
                        })
                    ).NormalizeWhitespace(elasticTrivia: true)
                );

                string directory = GetNamespaceDirectory(packageOutputRoot, @anchorNamespace);
                SaveSyntaxTree(directory, "Anchor.cs", syntaxTree);

                ClassDeclarationSyntax GenerateDependencyAnchor() {
                    return SF.ClassDeclaration(
                        SF.List<AttributeListSyntax>(),
                        SF.TokenList(SF.Token(SyntaxKind.PublicKeyword)),
                        SF.Identifier("Anchor"),
                        null,
                        null,
                        SF.List<TypeParameterConstraintClauseSyntax>(),
                        SF.List(new MemberDeclarationSyntax[] {
                            SF.ConstructorDeclaration(
                                SF.List<AttributeListSyntax>(),
                                SF.TokenList(SF.Token(SyntaxKind.PublicKeyword)),
                                SF.Identifier("Anchor"),
                                SF.ParameterList(SF.SeparatedList<ParameterSyntax>()),
                                null,
                                SF.Block(SF.List(GenerateAnchorReferences())),
                                null
                            )
                        })
                    );

                    IEnumerable<StatementSyntax> GenerateAnchorReferences()
                    {
                        return assembly.Dependencies?.Keys
                            .Select(k => assembly.GetNativeNamespace(k))
                            .Select(n => $"{n}.Internal.DependencyResolution.Anchor")
                            .Select(t => SF.ExpressionStatement(SF.ObjectCreationExpression(
                                SF.Token(SyntaxKind.NewKeyword),
                                SF.ParseTypeName(t),
                                SF.ArgumentList(SF.SeparatedList<ArgumentSyntax>()),
                                null
                            ))) ?? Enumerable.Empty<StatementSyntax>();
                    }
                }
            }

            void SaveAssemblyInfo(string name, string version, string tarball)
            {
                SyntaxTree assemblyInfo = SF.SyntaxTree(
                    SF.CompilationUnit(
                        SF.List<ExternAliasDirectiveSyntax>(),
                        SF.List(new[] {
                            SF.UsingDirective(SF.ParseName("Amazon.JSII.Runtime.Deputy"))
                        }),
                        SF.List(new[] {
                            SF.AttributeList(
                                SF.AttributeTargetSpecifier(
                                    SF.Identifier("assembly"),
                                    SF.Token(SyntaxKind.ColonToken)
                                ),
                                SF.SeparatedList(new[] {
                                    SF.Attribute(
                                        SF.ParseName("JsiiAssembly"),
                                        SF.ParseAttributeArgumentList($"({SF.Literal(name)}, {SF.Literal(version)}, {SF.Literal(tarball)})")
                                    )
                                })
                            )
                        }),
                        SF.List<MemberDeclarationSyntax>()
                    ).NormalizeWhitespace(elasticTrivia: true)
                );

                string assemblyInfoPath = Path.Combine(packageOutputRoot, "AssemblyInfo.cs");
                _fileSystem.File.WriteAllText(assemblyInfoPath, assemblyInfo.ToString());
            }

            void SaveType(Type type)
            {
                string @namespace = symbols.GetNamespace(type);
                string directory = GetNamespaceDirectory(packageOutputRoot, @namespace);

                switch (type.Kind)
                {
                    case TypeKind.Class:
                    {
                        var classType = (ClassType) type;
                        
                        if (classType.IsAbstract)
                        {
                            SaveTypeFile($"{symbols.GetAbstractClassProxyName(classType)}.cs",
                                new AbstractClassProxyGenerator(assembly.Name, classType, symbols).CreateSyntaxTree());
                        }

                        SaveTypeFile($"{symbols.GetName(type)}.cs",
                            new ClassGenerator(assembly.Name, classType, symbols).CreateSyntaxTree());
                        return;
                    }
                    case TypeKind.Enum:
                    {
                        SaveTypeFile($"{symbols.GetName(type)}.cs",
                            new EnumGenerator(assembly.Name, (EnumType) type, symbols).CreateSyntaxTree());
                        return;
                    }
                    case TypeKind.Interface:
                    {
                        InterfaceType interfaceType = (InterfaceType) type;

                        SaveTypeFile($"{symbols.GetName(interfaceType)}.cs",
                            new InterfaceGenerator(assembly.Name, interfaceType, symbols).CreateSyntaxTree());
                        SaveTypeFile($"{symbols.GetInterfaceProxyName(interfaceType)}.cs",
                            new InterfaceProxyGenerator(assembly.Name, interfaceType, symbols).CreateSyntaxTree());

                        if (interfaceType.IsDataType == true)
                        {
                            SaveTypeFile($"{symbols.GetInterfaceDefaultName(interfaceType)}.cs",
                                new InterfaceDefaultGenerator(assembly.Name, interfaceType, symbols)
                                    .CreateSyntaxTree());
                        }

                        return;
                    }
                    default:
                    {
                        throw new ArgumentException($"Unkown type kind: {type.Kind}", nameof(type));
                    }
                }

                void SaveTypeFile(string filename, SyntaxTree syntaxTree)
                {
                    SaveSyntaxTree(directory, filename, syntaxTree);
                }
            }

            void SaveSyntaxTree(string directory, string filename, SyntaxTree syntaxTree)
            {
                if (!_fileSystem.Directory.Exists(directory))
                {
                    _fileSystem.Directory.CreateDirectory(directory);
                }

                _fileSystem.File.WriteAllText(
                    Path.Combine(directory, filename),
                    syntaxTree.ToString()
                );
            }
        }

        string GetNamespaceDirectory(string packageOutputRoot, string @namespace)
        {
            string packageName = Path.GetFileName(packageOutputRoot);

            // packageOutputRoot is typically a directory like My.Root.Namespace/
            // We don't want to create redundant directories, i.e.
            // My.Root.Namespace/My/Root/Namespace/Sub/Namespace. We just
            // want My.Root.Namespace/Sub/Namespace.
            if (@namespace.StartsWith(packageName)) {
                @namespace = @namespace.Substring(packageName.Length).TrimStart('.');
            }

            return Path.Combine(packageOutputRoot, Path.Combine(@namespace.Split('.')));
        }
    }
}
