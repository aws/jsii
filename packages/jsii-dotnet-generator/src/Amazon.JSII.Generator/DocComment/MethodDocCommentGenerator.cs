using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.DocComment
{
    public class MethodDocCommentGenerator : DocCommentGeneratorBase<Method>
    {
        readonly ISymbolMap _symbols;

        public MethodDocCommentGenerator(Method documentable, ISymbolMap symbols) : base(documentable)
        {
            _symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));
        }

        protected override IEnumerable<XmlNodeSyntax> GetNodes()
        {
            IEnumerable<XmlNodeSyntax> nodes = GetSummaryNodes()
                .Concat(GetParamsNodes())
                .Concat(GetReturnsNodes())
                .Concat(GetRemarksNodes());

            if (nodes.Any())
            {
                // Due to a bug in SyntaxNodeExtensions.NormalizeWhitespace, whitespace trivia
                // following a documentation comment is removed. So we manually add the newline
                // and indentation as XmlText rather than as trivia.
                nodes = nodes.Concat(new XmlNodeSyntax[] { SF.XmlText($"{Environment.NewLine}        ") });
            }

            return nodes;
        }

        IEnumerable<XmlNodeSyntax> GetParamsNodes()
        {
            if (Documentable.Parameters == null)
            {
                yield break;
            }

            foreach (Parameter parameter in Documentable.Parameters.Where(p => p.Docs != null))
            {
                string text = string.Join(Environment.NewLine, GetParamTextLines(parameter));
                if (!string.IsNullOrEmpty(text))
                {
                    yield return SF.XmlText(" ").WithLeadingTrivia(SF.DocumentationCommentExterior(" "));
                    yield return SF.XmlParamElement(_symbols.GetName(parameter), GetXmlNodes(text).ToArray());
                }
            }

            IEnumerable<string> GetParamTextLines(Parameter parameter)
            {
                foreach (KeyValuePair<string, string> kvp in parameter.Docs)
                {
                    if (kvp.Key == "param")
                    {
                        continue;
                    }

                    if (kvp.Key == "summary")
                    {
                        yield return kvp.Value;
                    }
                    else
                    {
                        yield return $"{kvp.Key}: {kvp.Value}";
                    }
                }
            }
        }
    }
}
