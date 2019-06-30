using System.Collections.Generic;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Interface
{
    public class InterfaceProxyGenerator : TypeProxyGeneratorBase<InterfaceType>
    {
        public InterfaceProxyGenerator(string package, InterfaceType type, ISymbolMap symbols, INamespaceSet namespaces = null)
            : base(package, type, symbols, namespaces)
        {
        }
        
        protected override SyntaxToken GetProxyTypeNameSyntax()
        {
            return SF.Identifier(Symbols.GetInterfaceProxyName(Type));
        }

        protected override IEnumerable<PropertyDeclarationSyntax> CreateProperties()
        {
            foreach (Property property in Type.GetAllProperties(Symbols))
            {
                InterfaceProxyPropertyGenerator generator = new InterfaceProxyPropertyGenerator(Type, property, Symbols, Namespaces);
                yield return generator.CreateProperty();
            }
        }

        protected override IEnumerable<MemberDeclarationSyntax> CreateMethods()
        {
            foreach (Method method in Type.GetAllMethods(Symbols))
            {
                InterfaceProxyMethodGenerator generator = new InterfaceProxyMethodGenerator(Type, method, Symbols, Namespaces);
                yield return generator.CreateMethod();
            }
        }
    }
}
