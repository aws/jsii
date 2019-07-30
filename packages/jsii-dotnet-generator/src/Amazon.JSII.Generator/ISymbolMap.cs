using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Amazon.JSII.Generator
{
    public interface ISymbolMap
    {
        void Add(Assembly assembly);

        string GetAssemblyName(string name);

        string GetName(Assembly assembly);

        string GetName(Type type, bool qualified = false);

        string GetName(string fullyQualifiedName, bool qualified = false);
        
        string GetAbstractClassProxyName(ClassType type, bool qualified = false);

        string GetInterfaceProxyName(InterfaceType type, bool qualified = false);

        string GetInterfaceDefaultName(InterfaceType type, bool qualified = false);

        string GetName(Type type, Method method);

        string GetName(Type type, Property property);

        string GetName(Type type, EnumMember enumMember);

        string GetName(Parameter parameter);

        string GetNamespace(Type type);

        string GetNamespace(string fullyQualifiedName);

        string GetPackage(Type type);

        string GetPackage(string fullyQualifiedName);

        SyntaxToken GetNameSyntaxToken(Assembly assembly);

        SyntaxToken GetNameSyntaxToken(Type type, bool qualified = false);

        SyntaxToken GetNameSyntaxToken(string fullyQualifiedName, bool qualified = false);

        SyntaxToken GetInterfaceProxyNameSyntaxToken(InterfaceType type, bool qualified = false);

        SyntaxToken GetInterfaceDefaultNameSyntaxToken(InterfaceType type, bool qualified = false);

        SyntaxToken GetNameSyntaxToken(Type type, Method method);

        SyntaxToken GetNameSyntaxToken(Type type, Property property);

        SyntaxToken GetNameSyntaxToken(Type type, EnumMember enumMember);

        SyntaxToken GetNameSyntaxToken(Parameter parameter);

        SyntaxToken GetNamespaceSyntaxToken(Type type);

        SyntaxToken GetNamespaceSyntaxToken(string fullyQualifiedName);

        SyntaxToken GetPackageSyntaxToken(Type type);

        SyntaxToken GetPackageSyntaxToken(string fullyQualifiedName);

        NameSyntax GetNameSyntax(Assembly assembly);

        NameSyntax GetNameSyntax(Type type, bool qualified = false);

        NameSyntax GetNameSyntax(string fullyQualifiedName, bool qualified = false);

        NameSyntax GetInterfaceProxyNameSyntax(InterfaceType type, bool qualified = false);

        NameSyntax GetInterfaceDefaultNameSyntax(InterfaceType type, bool qualified = false);

        NameSyntax GetNameSyntax(Type type, Method method);

        NameSyntax GetNameSyntax(Type type, Property property);

        NameSyntax GetNameSyntax(Type type, EnumMember enumMember);

        NameSyntax GetNameSyntax(Parameter parameter);

        NameSyntax GetNamespaceSyntax(Type type);

        NameSyntax GetNamespaceSyntax(string fullyQualifiedName);

        NameSyntax GetPackageSyntax(Type type);

        NameSyntax GetPackageSyntax(string fullyQualifiedName);

        TypeSyntax GetTypeSyntax(TypeReference typeReference, bool isOptional);

        Type GetTypeFromFullyQualifiedName(string fullyQualifiedName);

    }
}
