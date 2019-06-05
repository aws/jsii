﻿using Amazon.JSII.Generator.DocComment;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Enum
{
    public class EnumGenerator : TypeGeneratorBase<EnumType>
    {
        public EnumGenerator(string package, EnumType type, ISymbolMap symbols, INamespaceSet namespaces = null)
            : base(package, type, symbols, namespaces)
        {
        }

        protected override MemberDeclarationSyntax CreateType()
        {
            return SF.EnumDeclaration
            (
                CreateAttributes(),
                SF.TokenList(SF.Token(SyntaxKind.PublicKeyword)),
                Symbols.GetNameSyntaxToken(Type),
                null,
                CreateValues()
            );
        }

        SyntaxList<AttributeListSyntax> CreateAttributes()
        {
            TypeOfExpressionSyntax typeOfExpression = SF.TypeOfExpression(Symbols.GetNameSyntax(Type));
            SyntaxToken fullyQualifiedNameLiteral = SF.Literal(Type.FullyQualifiedName);

            return SF.List(GetAttributeLists());

            IEnumerable<AttributeListSyntax> GetAttributeLists()
            {
                yield return SF.AttributeList(SF.SeparatedList(new[] {
                    SF.Attribute(
                        SF.ParseName("JsiiEnum"),
                        SF.ParseAttributeArgumentList($"(nativeType: {typeOfExpression}, fullyQualifiedName: {fullyQualifiedNameLiteral})")
                    )
                }));

                if (Type.Docs?.Deprecated != null)
                {
                    yield return SF.AttributeList(SF.SeparatedList(new[] {
                            SF.Attribute(
                                SF.ParseName("System.Obsolete"),
                                SF.AttributeArgumentList(
                                    SF.SingletonSeparatedList(
                                        SF.AttributeArgument(SF.LiteralExpression(SyntaxKind.StringLiteralExpression, SF.Literal(Type.Docs.Deprecated)))
                                    )
                                )
                            )
                        }));
                }
            }
        }

        SeparatedSyntaxList<EnumMemberDeclarationSyntax> CreateValues()
        {
            return SF.SeparatedList(Type.Members.Select(GetMemberDeclaration));

            EnumMemberDeclarationSyntax GetMemberDeclaration(EnumMember member)
            {
                EnumMemberDeclarationSyntax declaration = SF.EnumMemberDeclaration
                (
                    SF.List(GetAttributeLists()),
                    Symbols.GetNameSyntaxToken(Type, member),
                    null
                );

                if (member.Docs != null)
                {
                    DocCommentGeneratorBase<EnumMember> generator = new EnumMemberDocCommentGenerator(member);
                    SyntaxTriviaList trivia = SF.TriviaList(generator.CreateDocComment());

                    declaration = declaration.WithLeadingTrivia(trivia);
                }

                return declaration;

                IEnumerable<AttributeListSyntax> GetAttributeLists()
                {
                    yield return SF.AttributeList(SF.SingletonSeparatedList(
                        SF.Attribute(
                            SF.ParseName("JsiiEnumMember"),
                            SF.ParseAttributeArgumentList($"(name: \"{member.Name}\")")
                        )
                    ));

                    if (member.Docs?.Stability == Stability.Deprecated)
                    {
                        yield return SF.AttributeList(SF.SingletonSeparatedList(
                            SF.Attribute(
                                SF.ParseName("System.Obsolete"),
                                SF.ParseAttributeArgumentList($"({SF.Literal(member.Docs?.Deprecated ?? "")})")
                            )
                        ));
                    }
                }
            }
        }
    }
}
