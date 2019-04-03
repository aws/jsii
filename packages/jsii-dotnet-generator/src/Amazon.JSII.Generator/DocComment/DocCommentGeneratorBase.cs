using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.DocComment
{
    public abstract class DocCommentGeneratorBase<T>
        where T : class, IDocumentable
    {
        static readonly ISet<string> _wellKnownKeys = new HashSet<string>(new[]
        {
            "summary",
            "param",
            "returns",
            "custom",
        });

        public DocCommentGeneratorBase(T documentable)
        {
            Documentable = documentable ?? throw new ArgumentNullException(nameof(documentable));
        }

        protected T Documentable { get; }

        public SyntaxTrivia CreateDocComment()
        {
            return SF.Trivia(
                SF.DocumentationCommentTrivia(SyntaxKind.SingleLineDocumentationCommentTrivia)
                    .AddContent(GetNodes().ToArray())
            );
        }

        protected abstract IEnumerable<XmlNodeSyntax> GetNodes();

        protected IEnumerable<XmlNodeSyntax> GetSummaryNodes()
        {
            if (Documentable.Docs?.ContainsKey("summary") == true)
            {
                yield return SF.XmlText(" ").WithLeadingTrivia(SF.DocumentationCommentExterior(" "));
                yield return SF.XmlSummaryElement(GetXmlNodes(Documentable.Docs["summary"]).ToArray());
            }
        }

        protected IEnumerable<XmlNodeSyntax> GetRemarksNodes()
        {
            if (Documentable.Docs == null)
            {
                yield break;
            }

            string remarks = string.Join(Environment.NewLine, Documentable.Docs
                .Where(kvp => !_wellKnownKeys.Contains(kvp.Key))
                // Visual Studio will include the closing </remarks> tag as part
                // of the clickable link if there is no space separating it.
                .Select(kvp => (kvp.Key != "remarks" ? kvp.Key + ": " : "") + $"{kvp.Value}{(kvp.Key == "link" ? " " : "")}"));

            if (remarks.Any())
            {
                yield return SF.XmlText(" ").WithLeadingTrivia(SF.DocumentationCommentExterior(" "));
                yield return SF.XmlRemarksElement(GetXmlNodes(remarks).ToArray());
            }
        }

        protected IEnumerable<XmlNodeSyntax> GetReturnsNodes()
        {
            if (Documentable.Docs?.ContainsKey("returns") != true)
            {
                yield break;
            }

            string text = Documentable.Docs["returns"];

            yield return SF.XmlText(" ").WithLeadingTrivia(SF.DocumentationCommentExterior(" "));
            yield return SF.XmlReturnsElement(GetXmlNodes(text).ToArray());
        }

        protected IEnumerable<XmlNodeSyntax> GetXmlNodes(string text)
        {
            string[] tokens = text.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None);

            if (tokens.Length == 1)
            {
                yield return SF.XmlText($"{tokens[0]}");
                yield break;
            }

            foreach (XmlNodeSyntax node in tokens.Select(t =>
                SF.XmlText($" {t}").WithLeadingTrivia(SF.DocumentationCommentExterior(" "))
            ))
            {
                yield return node;
            }

            yield return SF.XmlNewLine(Environment.NewLine);
            yield return SF.XmlText(" ");
        }
    }
}
