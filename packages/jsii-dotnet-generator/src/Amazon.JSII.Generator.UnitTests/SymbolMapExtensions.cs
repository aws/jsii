using Amazon.JSII.JsonModel.Spec;
using NSubstitute;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.UnitTests
{
    static class SymbolMapExtensions
    {
        public static void MapPropertyName(this ISymbolMap symbols, string ownerFullyQualifiedName, string jsiiName, string frameworkName)
        {
            symbols.GetName(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<Property>(p => p.Name == jsiiName)
            ).Returns(frameworkName);
            symbols.GetNameSyntaxToken(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<Property>(p => p.Name == jsiiName)
            ).Returns(SF.ParseToken(frameworkName));
            symbols.GetNameSyntax(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<Property>(p => p.Name == jsiiName)
            ).Returns(SF.ParseName(frameworkName));
        }

        public static void MapMethodName(this ISymbolMap symbols, string ownerFullyQualifiedName, string jsiiName, string frameworkName)
        {
            symbols.GetName(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<Method>(m => m.Name == jsiiName)
            ).Returns(frameworkName);
            symbols.GetNameSyntaxToken(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<Method>(m => m.Name == jsiiName)
            ).Returns(SF.ParseToken(frameworkName));
            symbols.GetNameSyntax(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<Method>(m => m.Name == jsiiName)
            ).Returns(SF.ParseName(frameworkName));
        }

        public static void MapEnumMemberName(this ISymbolMap symbols, string ownerFullyQualifiedName, string jsiiName, string frameworkName)
        {
            symbols.GetName(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<EnumMember>(m => m.Name == jsiiName)
            ).Returns(frameworkName);
            symbols.GetNameSyntaxToken(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<EnumMember>(m => m.Name == jsiiName)
            ).Returns(SF.ParseToken(frameworkName));
            symbols.GetNameSyntax(
                Arg.Is<Type>(t => t.FullyQualifiedName == ownerFullyQualifiedName),
                Arg.Is<EnumMember>(m => m.Name == jsiiName)
            ).Returns(SF.ParseName(frameworkName));
        }

        public static void MapParameterName(this ISymbolMap symbols,  string jsiiName, string frameworkName)
        {
            symbols.GetName(Arg.Is<Parameter>(t => t.Name == jsiiName)).Returns(frameworkName);
            symbols.GetNameSyntaxToken(Arg.Is<Parameter>(t => t.Name == jsiiName)).Returns(SF.ParseToken(frameworkName));
            symbols.GetNameSyntax(Arg.Is<Parameter>(t => t.Name == jsiiName)).Returns(SF.ParseName(frameworkName));
        }

        public static void MapTypeName(this ISymbolMap symbols, string fullyQualifiedName, string frameworkName, TypeKind kind)
        {
            if (kind == TypeKind.Interface)
            {
                string proxyName = $"{frameworkName}Proxy";
                string defaultName = frameworkName;

                symbols
                    .GetInterfaceProxyName(Arg.Is<InterfaceType>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                    .Returns(proxyName);
                symbols
                    .GetInterfaceDefaultName(Arg.Is<InterfaceType>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                    .Returns(defaultName);
                symbols
                    .GetInterfaceProxyNameSyntaxToken(Arg.Is<InterfaceType>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                    .Returns(SF.ParseToken(proxyName));
                symbols
                    .GetInterfaceDefaultNameSyntaxToken(Arg.Is<InterfaceType>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                    .Returns(SF.ParseToken(defaultName));
                symbols
                    .GetInterfaceProxyNameSyntax(Arg.Is<InterfaceType>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                    .Returns(SF.ParseName(proxyName));
                symbols
                    .GetInterfaceDefaultNameSyntax(Arg.Is<InterfaceType>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                    .Returns(SF.ParseName(defaultName));

                frameworkName = $"I{frameworkName}";
            }
            
            if (kind == TypeKind.Class)
            {
                string proxyName = $"{frameworkName}Proxy";

                symbols
                    .GetAbstractClassProxyName(Arg.Is<ClassType>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                    .Returns(proxyName);
            }
            
            symbols
                .GetName(Arg.Is<Type>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                .Returns(frameworkName);
            symbols
                .GetName(Arg.Is<string>(fqn => fqn == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                .Returns(frameworkName);
            symbols
                .GetNameSyntaxToken(Arg.Is<Type>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                .Returns(SF.ParseToken(frameworkName));
            symbols
                .GetNameSyntaxToken(Arg.Is<string>(fqn => fqn == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                .Returns(SF.ParseToken(frameworkName));
            symbols
                .GetNameSyntax(Arg.Is<Type>(t => t.FullyQualifiedName == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                .Returns(SF.ParseName(frameworkName));
            symbols
                .GetNameSyntax(Arg.Is<string>(fqn => fqn == fullyQualifiedName), disambiguate: Arg.Any<bool>())
                .Returns(SF.ParseName(frameworkName));
            symbols
                .GetTypeSyntax(Arg.Is<TypeReference>(t => t.FullyQualifiedName == fullyQualifiedName))
                .Returns(SF.ParseTypeName(frameworkName));
        }

        public static void MapAssemblyName(this ISymbolMap symbols, string jsiiName, string frameworkName)
        {
            symbols
                .GetName(Arg.Is<Assembly>(a => a.Name == jsiiName))
                .Returns(frameworkName);
            symbols
                .GetNameSyntaxToken(Arg.Is<Assembly>(a => a.Name == jsiiName))
                .Returns(SF.ParseToken(frameworkName));
            symbols
                .GetNameSyntax(Arg.Is<Assembly>(a => a.Name == jsiiName))
                .Returns(SF.ParseName(frameworkName));

            symbols
                .GetAssemblyName(Arg.Is<string>(n => n == jsiiName))
                .Returns(frameworkName);
        }

        public static void MapNamespace(this ISymbolMap symbols, string jsiiNamespace, string frameworkNamespace)
        {
            symbols
                .GetNamespace(Arg.Is<Type>(t => t.QualifiedNamespace == jsiiNamespace))
                .Returns(frameworkNamespace);
            symbols
                .GetNamespaceSyntaxToken(Arg.Is<Type>(t => t.QualifiedNamespace == jsiiNamespace))
                .Returns(SF.ParseToken(frameworkNamespace));
            symbols
                .GetNamespaceSyntax(Arg.Is<Type>(t => t.QualifiedNamespace == jsiiNamespace))
                .Returns(SF.ParseName(frameworkNamespace));
        }

        public static void MapTypeToNamespace(this ISymbolMap symbols, string fullyQualifiedName, string frameworkNamespace)
        {
            symbols
                .GetNamespace(Arg.Is<string>(n => n == fullyQualifiedName))
                .Returns(frameworkNamespace);
            symbols
                .GetNamespaceSyntaxToken(Arg.Is<string>(n => n == fullyQualifiedName))
                .Returns(SF.ParseToken(frameworkNamespace));
            symbols
                .GetNamespaceSyntax(Arg.Is<string>(n => n == fullyQualifiedName))
                .Returns(SF.ParseName(frameworkNamespace));
        }

        public static void MapTypeToPackage(this ISymbolMap symbols, string fullyQualifiedName, string package)
        {
            symbols
                .GetPackage(Arg.Is<Type>(t => t.FullyQualifiedName == fullyQualifiedName))
                .Returns(package);
            symbols
                .GetPackage(Arg.Is<string>(n => n == fullyQualifiedName))
                .Returns(package);
            symbols
                .GetPackageSyntaxToken(Arg.Is<Type>(t => t.FullyQualifiedName == fullyQualifiedName))
                .Returns(SF.ParseToken(package));
            symbols
                .GetPackageSyntaxToken(Arg.Is<string>(n => n == fullyQualifiedName))
                .Returns(SF.ParseToken(package));
            symbols
                .GetPackageSyntax(Arg.Is<Type>(t => t.FullyQualifiedName == fullyQualifiedName))
                .Returns(SF.ParseName(package));
            symbols
                .GetPackageSyntax(Arg.Is<string>(n => n == fullyQualifiedName))
                .Returns(SF.ParseName(package));
        }

        public static void MapFullyQualifiedNameToType(this ISymbolMap symbols, string fullyQualifiedName, Type type)
        {
            symbols
                .GetTypeFromFullyQualifiedName(Arg.Is<string>(n => n == fullyQualifiedName))
                .Returns(type);
        }
    }
}
