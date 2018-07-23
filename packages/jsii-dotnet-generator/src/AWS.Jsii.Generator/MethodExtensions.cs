using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator
{
    public static class MethodExtensions
    {
        public static ParameterListSyntax GetParameterListSyntax(this Method method, INamespaceSet namespaces, ISymbolMap symbols)
        {
            method = method ?? throw new ArgumentNullException(nameof(method));
            namespaces = namespaces ?? throw new ArgumentNullException(nameof(namespaces));
            symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));

            return SF.ParameterList(SF.SeparatedList(GetParameters()));

            IEnumerable<ParameterSyntax> GetParameters()
            {
                if (method.Parameters == null)
                {
                    yield break;
                }

                foreach (Parameter parameter in method.Parameters)
                {
                    namespaces.Add(parameter.Type);

                    yield return SF.Parameter(
                        SF.List<AttributeListSyntax>(),
                        SF.TokenList(),
                        symbols.GetTypeSyntax(parameter.Type),
                        symbols.GetNameSyntaxToken(parameter),
                        null
                    );
                }
            }
        }

        public static SyntaxToken GetParametersJsonSyntaxToken(this Method method)
        {
            // Strip docs before serializing.
            Parameter[] parameters = (method.Parameters ?? Enumerable.Empty<Parameter>())
                .Select(p => new Parameter(p.Name, p.Type))
                .ToArray();

            return SF.Literal(JsonConvert.SerializeObject(parameters));
        }
    }
}
