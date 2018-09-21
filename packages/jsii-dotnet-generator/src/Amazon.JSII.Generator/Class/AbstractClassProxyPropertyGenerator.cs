using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis.CSharp;

namespace Amazon.JSII.Generator.Class
{
    public class AbstractClassProxyPropertyGenerator : ClassPropertyGenerator
    {
        public AbstractClassProxyPropertyGenerator(ClassType type, Property property, ISymbolMap symbols,
            INamespaceSet namespaces) : base(type, property, symbols, namespaces)
        {
        }

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield return Property.IsProtected == true ? SyntaxKind.ProtectedKeyword : SyntaxKind.PublicKeyword;

            // Type is the abstract class, so we need to check it as well as ancestors.
            if (IsDefinedOnAncestor || Type.Properties.Any(p => p.Name == Property.Name))
            {
                yield return SyntaxKind.OverrideKeyword;
            }
            else
            {
                yield return SyntaxKind.VirtualKeyword;
            }
        }
    }
}