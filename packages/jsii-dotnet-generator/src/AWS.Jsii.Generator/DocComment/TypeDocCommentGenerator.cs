using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using Type = AWS.Jsii.JsonModel.Spec.Type;

namespace AWS.Jsii.Generator.DocComment
{
    public class TypeDocCommentGenerator : DocCommentGeneratorBase<Type>
    {
        public TypeDocCommentGenerator(Type documentable) : base(documentable)
        {
        }

        protected override IEnumerable<XmlNodeSyntax> GetNodes()
        {
            IEnumerable<XmlNodeSyntax> nodes = GetSummaryNodes()
                .Concat(GetRemarksNodes());

            if (nodes.Any())
            {
                // Due to a bug in SyntaxNodeExtensions.NormalizeWhitespace, whitespace trivia
                // following a documentation comment is removed. So we manually add the newline
                // and indentation as XmlText rather than as trivia.
                nodes = nodes.Concat(new XmlNodeSyntax[] { SF.XmlText($"{Environment.NewLine}    ") });
            }

            return nodes;
        }
    }
}
