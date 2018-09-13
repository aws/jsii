using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Generator.Interface
{
    public class InterfaceMethodGenerator : MethodGeneratorBase<InterfaceType>
    {
        public InterfaceMethodGenerator(InterfaceType type, Method method, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, method, symbols, namespaces)
        {
            if (method.IsAbstract != true)
            {
                throw new ArgumentException("Interface methods must be abstract", nameof(method));
            }

            if (method.IsProtected)
            {
                throw new ArgumentException("Protected methods are not allowed on interfaces", nameof(method));
            }

            if (method.IsStatic == true)
            {
                throw new ArgumentException(
                    $"Method {type.Name}.{method.Name} is marked as static, but interfaces must not contain static members.",
                    nameof(method)
                );
            }
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
