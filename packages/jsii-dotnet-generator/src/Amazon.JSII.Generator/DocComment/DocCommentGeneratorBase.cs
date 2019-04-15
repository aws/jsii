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
            "param",
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
            if (!String.IsNullOrEmpty(Documentable.Docs?.Summary))
            {
                yield return SF.XmlText(" ").WithLeadingTrivia(SF.DocumentationCommentExterior(" "));
                yield return SF.XmlSummaryElement(GetXmlNodes(Documentable.Docs.Summary).ToArray());
            }
        }

        protected IEnumerable<XmlNodeSyntax> GetRemarksNodes()
        {
            if (Documentable.Docs == null)
            {
                yield break;
            }

            List<string> remarks = new List<string>();
            if (!String.IsNullOrEmpty(Documentable.Docs.Remarks)) { remarks.Add(Documentable.Docs.Remarks); }
            if (!String.IsNullOrEmpty(Documentable.Docs.Default)) { remarks.Add($"default: {Documentable.Docs.Default}"); }
            if (!String.IsNullOrEmpty(Documentable.Docs.Deprecated)) { remarks.Add($"deprecated: {Documentable.Docs.Deprecated}"); }
            if (Documentable.Docs.Stability.HasValue) { remarks.Add($"stability: {Documentable.Docs.Stability}"); }
            if (!String.IsNullOrEmpty(Documentable.Docs.Example)) { remarks.Add($"example:\n<code>\n{Documentable.Docs.Example}\n</code>"); }
            if (!String.IsNullOrEmpty(Documentable.Docs.See)) { remarks.Add($"{Documentable.Docs.See} "); } // Extra space here to keep links clickable
            if (Documentable.Docs.Subclassable.GetValueOrDefault(false)) { remarks.Add($"subclassable"); }

            remarks.AddRange(Documentable.Docs.Custom
                .Where(kvp => !_wellKnownKeys.Contains(kvp.Key))
                .Select(kvp => kvp.Key == "link"
                    ? $"{kvp.Key}: {kvp.Value} "  // Extra space for '@link' to keep unit tests happy
                    : $"{kvp.Key}: {kvp.Value}"
                    ));

            if (remarks.Any())
            {
                yield return SF.XmlText(" ").WithLeadingTrivia(SF.DocumentationCommentExterior(" "));
                yield return SF.XmlRemarksElement(GetXmlNodes(string.Join(Environment.NewLine, remarks)).ToArray());
            }
        }

        protected IEnumerable<XmlNodeSyntax> GetReturnsNodes()
        {
            var text = Documentable.Docs?.Returns;

            if (!String.IsNullOrEmpty(text)) {
                yield return SF.XmlText(" ").WithLeadingTrivia(SF.DocumentationCommentExterior(" "));
                yield return SF.XmlReturnsElement(GetXmlNodes(text).ToArray());
            }
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
