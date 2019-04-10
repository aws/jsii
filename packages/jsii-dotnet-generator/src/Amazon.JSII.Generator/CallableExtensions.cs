using System;
using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator
{
    public static class CallableExtensions
    {
        public static ParameterListSyntax GetParameterListSyntax(this Callable callable, INamespaceSet namespaces, ISymbolMap symbols)
        {
            callable = callable ?? throw new ArgumentNullException(nameof(callable));
            namespaces = namespaces ?? throw new ArgumentNullException(nameof(namespaces));
            symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));

            return SF.ParameterList(SF.SeparatedList(GetParameters()));

            IEnumerable<ParameterSyntax> GetParameters()
            {
                if (callable.Parameters == null)
                {
                    yield break;
                }

                foreach (Parameter parameter in callable.Parameters)
                {
                    namespaces.Add(parameter.Type);

                    yield return SF.Parameter(
                        SF.List<AttributeListSyntax>(),
                        SF.TokenList(),
                        symbols.GetTypeSyntax(parameter.Type, parameter.IsOptional),
                        symbols.GetNameSyntaxToken(parameter),
                        null
                    );
                }
            }
        }

        private static readonly JsonSerializerSettings SerializerSettings = new JsonSerializerSettings
        {
            DefaultValueHandling = DefaultValueHandling.Ignore
        };
        
        public static SyntaxToken GetParametersJsonSyntaxToken(this Callable callable)
        {
            // Strip docs before serializing.
            Parameter[] parameters = (callable?.Parameters ?? Enumerable.Empty<Parameter>())
                .Select(p => new Parameter(p.Name, p.Type))
                .ToArray();

            return SF.Literal(JsonConvert.SerializeObject(parameters, SerializerSettings));
        }
    }
}
