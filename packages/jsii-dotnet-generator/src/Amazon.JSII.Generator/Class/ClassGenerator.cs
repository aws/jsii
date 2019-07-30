using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.Generator.DocComment;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Class
{
    public class ClassGenerator : TypeGeneratorBase<ClassType>
    {
        public ClassGenerator(string package, ClassType type, ISymbolMap symbols, INamespaceSet namespaces = null)
            : base(package, type, symbols, namespaces)
        {
        }

        protected override MemberDeclarationSyntax CreateType()
        {
            return SF.ClassDeclaration
            (
                CreateAttributes(),
                CreateModifiers(),
                Symbols.GetNameSyntaxToken(Type),
                null,
                CreateBaseList(),
                SF.List<TypeParameterConstraintClauseSyntax>(),
                SF.List(CreateMembers())
            );

            SyntaxList<AttributeListSyntax> CreateAttributes()
            {
                TypeOfExpressionSyntax typeOfExpression = SF.TypeOfExpression(Symbols.GetNameSyntax(Type));
                SyntaxToken fullyQualifiedNameLiteral = SF.Literal(Type.FullyQualifiedName);

                var argumentList = $"nativeType: {typeOfExpression}, fullyQualifiedName: {fullyQualifiedNameLiteral}";
                if ((Type.Initializer?.Parameters?.Length ?? 0) > 0)
                {
                    SyntaxToken parametersJsonLiteral = Type.Initializer.GetParametersJsonSyntaxToken();
                    argumentList += $", parametersJson: {parametersJsonLiteral}";
                }
                
                return SF.List(GetAttributeLists());

                IEnumerable<AttributeListSyntax> GetAttributeLists()
                {
                    yield return SF.AttributeList(SF.SeparatedList(new[] {
                        SF.Attribute(
                            SF.ParseName("JsiiClass"),
                            SF.ParseAttributeArgumentList($"({argumentList})")
                        )
                    }));

                    if (Type.Docs?.Stability == Stability.Deprecated)
                    {
                        var argument = Type.Docs?.Deprecated != null ? SF.Literal(Type.Docs?.Deprecated).ToString() : "";
                        yield return SF.AttributeList(SF.SeparatedList(new[] {
                            SF.Attribute(
                                SF.ParseName("System.Obsolete"),
                                SF.ParseAttributeArgumentList($"({argument})")
                            )
                        }));
                    }
                }
            }

            SyntaxTokenList CreateModifiers()
            {
                SyntaxTokenList modifierList = SF.TokenList(SF.Token(SyntaxKind.PublicKeyword));

                if (Type.IsAbstract)
                {
                    modifierList = modifierList.Add(SF.Token(SyntaxKind.AbstractKeyword));
                }

                return modifierList;
            }

            BaseListSyntax CreateBaseList()
            {
                return SF.BaseList(SF.SeparatedList(GetBaseTypes()));

                IEnumerable<BaseTypeSyntax> GetBaseTypes()
                {
                    if (Type.Base == null)
                    {
                        yield return SF.SimpleBaseType(SF.ParseTypeName("DeputyBase"));
                    }
                    else
                    {
                        yield return SF.SimpleBaseType(Symbols.GetNameSyntax(Type.Base, qualified: true));
                    }

                    if (Type.Interfaces == null)
                    {
                        yield break;
                    }

                    foreach (var interfaceReference in Type.Interfaces)
                    {
                        yield return SF.SimpleBaseType(Symbols.GetNameSyntax(interfaceReference, qualified: true));
                    }
                }
            }

            IEnumerable<MemberDeclarationSyntax> CreateMembers()
            {
                return CreateConstructors()
                    .Concat(CreateProperties())
                    .Concat(CreateMethods());
            }
        }

        IEnumerable<MemberDeclarationSyntax> CreateConstructors()
        {
            SyntaxToken typeName = Symbols.GetNameSyntaxToken(Type);
            var attributes = GetAttributeLists();

            if (Type.Initializer != null)
            {
                var docComment = new MethodDocCommentGenerator(Type.Initializer, Symbols).CreateDocComment();
                yield return SF.ConstructorDeclaration
                (
                    attributes,
                    SF.TokenList(SF.Token(
                        Type.IsAbstract || Type.Initializer.IsProtected
                            ? SyntaxKind.ProtectedKeyword
                            : SyntaxKind.PublicKeyword
                    )),
                    typeName,
                    Type.Initializer.GetParameterListSyntax(Namespaces, Symbols),
                    SF.ConstructorInitializer
                    (
                        SyntaxKind.BaseConstructorInitializer,
                        SF.ArgumentList(
                            SF.SeparatedList(new[]
                            {
                                SF.Argument(
                                    SF.ObjectCreationExpression(
                                        SF.Token(SyntaxKind.NewKeyword),
                                        SF.ParseTypeName("DeputyProps"),
                                        SF.ArgumentList(SF.SeparatedList(
                                            new[] {GetBaseArgument()}
                                        )),
                                        null
                                    )
                                )
                            })
                        )
                    ),
                    SF.Block(),
                    null
                ).WithLeadingTrivia(docComment);
            }

            yield return SF.ConstructorDeclaration
            (
                attributes,
                SF.TokenList(SF.Token(SyntaxKind.ProtectedKeyword)),
                typeName,
                SF.ParseParameterList("(ByRefValue reference)"),
                SF.ConstructorInitializer
                (
                    SyntaxKind.BaseConstructorInitializer,
                    SF.ParseArgumentList("(reference)")
                ),
                SF.Block(),
                null
            );

            // This constructor allows child classes to supply their own parameter lists. It is always protected.
            yield return SF.ConstructorDeclaration
            (
                attributes,
                SF.TokenList(SF.Token(SyntaxKind.ProtectedKeyword)),
                typeName,
                SF.ParseParameterList("(DeputyProps props)"),
                SF.ConstructorInitializer
                (
                    SyntaxKind.BaseConstructorInitializer,
                    SF.ParseArgumentList("(props)")
                ),
                SF.Block(),
                null
            );

            ArgumentSyntax GetBaseArgument()
            {
                var deputyArguments = (Type.Initializer.Parameters ?? Enumerable.Empty<Parameter>())
                    .Select(p => Symbols.GetNameSyntaxToken(p))
                    .Select(i => SF.IdentifierName(i));

                // In C#, arrays of reference types are covariant. Because of this, passing a string[]
                // to a method that takes `params object[] args` will interperet the string array *as*
                // args, rather than as args' first element. To workaround with, we remove the params
                // keyword from DeputyBase's constructor, and always explicitly create an array of
                // objects when calling it.
                return SF.Argument(
                    SF.ArrayCreationExpression(
                        SF.Token(SyntaxKind.NewKeyword),
                        SF.ArrayType(SF.ParseTypeName("object[]")),
                        SF.InitializerExpression(
                            SyntaxKind.ArrayInitializerExpression,
                            SF.SeparatedList<ExpressionSyntax>(deputyArguments)
                        )
                    )
                );
            }

            SyntaxList<AttributeListSyntax> GetAttributeLists()
            {
                if (Type.Initializer?.Docs?.Stability != Stability.Deprecated)
                {
                    return SF.List<AttributeListSyntax>();
                }
                var argument = Type.Initializer?.Docs?.Deprecated != null ? SF.Literal(Type.Initializer?.Docs?.Deprecated).ToString() : "";
                return SF.List(new[] { SF.AttributeList(SF.SingletonSeparatedList(
                    SF.Attribute(
                        SF.ParseName("System.Obsolete"),
                        SF.ParseAttributeArgumentList($"({argument})")
                    )
                )) });
            }
        }

        IEnumerable<PropertyDeclarationSyntax> CreateProperties()
        {
            if (Type.Properties == null)
            {
                yield break;
            }

            foreach (Property property in Type.Properties)
            {
                ClassPropertyGenerator generator = new ClassPropertyGenerator(Type, property, Symbols, Namespaces);
                yield return generator.CreateProperty();
            }
        }

        IEnumerable<MemberDeclarationSyntax> CreateMethods()
        {
            if (Type.Methods == null)
            {
                yield break;
            }

            foreach (Method method in Type.Methods)
            {
                ClassMethodGenerator generator = new ClassMethodGenerator(Type, method, Symbols, Namespaces);
                yield return generator.CreateMethod();
            }
        }
    }
}
