using System.Collections.Generic;
using System.Collections.Immutable;
using System.Globalization;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Diagnostics;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Amazon.JSII.Analyzers
{
    [DiagnosticAnalyzer(LanguageNames.CSharp)]
    public class JsiiOptionalAnalyzer : DiagnosticAnalyzer
    {
        private const string DiagnosticId = "JSII001";
        private const string Title = "A required property is missing or null";
        private const string MessageFormat = "The property is required and cannot be null";
        private const string MessageFormatWithPropertyName = "The property {0} is required and cannot be null";
        private const string Description = "The property is required and cannot be null.";
        private const string DescriptionWithPropertyName = "The property {0} is required and cannot be null.";
        private const string Category = "Jsii.Usage";

        private static readonly DiagnosticDescriptor Rule =
            new DiagnosticDescriptor(DiagnosticId, Title, MessageFormat, Category, DiagnosticSeverity.Error, isEnabledByDefault: true, description: Description);

        public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics => ImmutableArray.Create(Rule);

        public override void Initialize(AnalysisContext context)
        {
            if (context == null)
            {
                return;
            }
            context.EnableConcurrentExecution();
            context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.Analyze);
            context.RegisterSyntaxNodeAction(AnalyzeNode, SyntaxKind.ObjectCreationExpression);
        }

        private static void AnalyzeNode(SyntaxNodeAnalysisContext context)
        {
            var objectCreation = (ObjectCreationExpressionSyntax)context.Node;
            var typeInfo = context.SemanticModel.GetTypeInfo(objectCreation);
            if (IsJsiiDatatype(typeInfo))
            {
                // If the newly created instance is a Jsii datatype [JsiiByValue]
                // Get all the properties passed
                var passedProperties = new HashSet<string>();
                foreach (var child in objectCreation.ChildNodes())
                {
                    if (child.Kind() == SyntaxKind.ObjectInitializerExpression)
                    {
                        // This is an inline initialization
                        // Saving all the properties that are passed when initializing the props object
                        foreach (var passedProperty in child.ChildNodes().Where(n => n.Kind() == SyntaxKind.SimpleAssignmentExpression))
                        {
                            var props = passedProperty.ChildNodes().ToArray();
                            if (props.Length >= 2)
                            {
                                // Property = value
                                if (props[1].ToString() != "null") // value != null ?
                                {
                                    var propName = props[0].ToString();
                                    passedProperties.Add(propName);
                                }
                            }
                        }
                    }
                }

                // Parent.Parent.Parent = new Construct() instruction.
                // #1 Parent = Argument
                // #2 Parent = ArgumentList
                // #3 Parent = ObjectCreationExpressionSyntax (if it exists).
                var parentType = context.SemanticModel.GetTypeInfo(objectCreation.Parent.Parent.Parent);

                // If the object initialization was an empty newProps() outside of a JsiiClass - We don't fail
                if (passedProperties.Count == 0 && (parentType.Type == null || !IsJsiiClass(parentType)))
                    return;

                // Get all the required properties on the prop object
                var requiredProperties = typeInfo.Type.GetMembers()
                    .Where(m => m.Kind == SymbolKind.Property
                                && !IsJsiiOptionalProperty(m));
                foreach (var requiredProperty in requiredProperties)
                {
                    // The property in the props class IS NOT optional, check if it is passed as an argument.
                    if (!passedProperties.Contains(requiredProperty.Name))
                    {
                        // This property IS REQUIRED and was not passed in the arguments. Raising an error
                        var rule = new DiagnosticDescriptor(DiagnosticId,
                            Title,
                            string.Format(CultureInfo.InvariantCulture, MessageFormatWithPropertyName,
                                requiredProperty.Name),
                            Category,
                            DiagnosticSeverity.Error,
                            isEnabledByDefault: true,
                            description: string.Format(CultureInfo.InvariantCulture, DescriptionWithPropertyName,
                                requiredProperty.Name));
                        context.ReportDiagnostic(Diagnostic.Create(rule, context.Node.GetLocation()));
                    }
                }
            }
        }

        /// <summary>
        /// Checks if the TypeInfo is related to a Jsii class
        /// </summary>
        /// <remarks>
        /// This is done by checking for the [JsiiClass] attribute
        /// </remarks>
        /// <param name="typeInfo">The TypeInfo object to check for</param>
        /// <returns>true if the TypeInfo is related to a Jsii class, false otherwise</returns>
        private static bool IsJsiiClass(TypeInfo typeInfo)
        {
            if (typeInfo.Type == null)
            {
                return false;
            }
            var typeAttributes = typeInfo.Type.GetAttributes().ToArray();
            return typeAttributes.Any(a => a.AttributeClass.Name == "JsiiClassAttribute");
        }

        /// <summary>
        /// Checks if the TypeInfo is related to a Jsii datatype
        /// </summary>
        /// <remarks>
        /// This is done by checking for the [JsiiByValueAttribute] attribute
        /// </remarks>
        /// <param name="typeInfo">The TypeInfo object to check for</param>
        /// <returns>true if the TypeInfo is related to a Jsii datatype, false otherwise</returns>
        private static bool IsJsiiDatatype(TypeInfo typeInfo)
        {
            if (typeInfo.Type == null)
            {
                return false;
            }
            var typeAttributes = typeInfo.Type.GetAttributes().ToArray();
            return typeAttributes.Any(a => a.AttributeClass.Name == "JsiiByValueAttribute");
        }

        /// <summary>
        /// Checks if the property is optional for jsii
        /// </summary>
        /// <remarks>
        /// This is done by checking for the [JsiiOptionalAttribute] attribute
        /// </remarks>
        /// <param name="property">The property to check for</param>
        /// <returns>true if the property is optional, false otherwise</returns>
        private static bool IsJsiiOptionalProperty(ISymbol property)
        {
            return property.GetAttributes().Any(a => a.AttributeClass.Name == "JsiiOptionalAttribute");
        }
    }
}
