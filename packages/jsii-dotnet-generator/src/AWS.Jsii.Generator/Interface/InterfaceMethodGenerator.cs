using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;

namespace AWS.Jsii.Generator.Interface
{
    public class InterfaceMethodGenerator : MethodGeneratorBase<InterfaceType>
    {
        public InterfaceMethodGenerator(InterfaceType type, Method method, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, method, symbols, namespaces)
        {
        }

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield break;
        }

        protected override BlockSyntax GetBody()
        {
            return null;
        }

        protected override bool HasSemicolon => true;
    }
}
