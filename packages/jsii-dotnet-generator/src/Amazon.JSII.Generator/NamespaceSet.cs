using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using Type = Amazon.JSII.JsonModel.Spec.Type;

namespace Amazon.JSII.Generator
{
    public class NamespaceSet : INamespaceSet
    {
        readonly ISet<NameSyntax> _referencedNamespaces;
        readonly ISymbolMap _symbols;
        readonly NameSyntax _currentNamespace;

        public NamespaceSet(ISymbolMap symbols, NameSyntax currentNamespace)
        {
            _symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));
            _currentNamespace = currentNamespace ?? throw new ArgumentNullException(nameof(currentNamespace));
            
            _referencedNamespaces = new HashSet<NameSyntax>
            (
                new[] { SF.ParseName("Amazon.JSII.Runtime.Deputy") },
                new DelegateComparer<NameSyntax, string>(nameSyntax => nameSyntax.ToString())
            );
        }

        public SyntaxList<UsingDirectiveSyntax> GetUsings()
        {
            // Don't add a redundant using for the current namespace.
            _referencedNamespaces.Remove(_currentNamespace);

            IEnumerable<UsingDirectiveSyntax> usings = _referencedNamespaces
                .Select(n => SF.UsingDirective(n))
                .OrderBy(u => u.Name.ToString().ToUpperInvariant());

            return SF.List(usings);
        }

        public void Add(Type type)
        {
            _referencedNamespaces.Add(_symbols.GetNamespaceSyntax(type));
        }

        public void Add(TypeReference typeReference)
        {
            if (typeReference.FullyQualifiedName != null)
            {
                _referencedNamespaces.Add(_symbols.GetNamespaceSyntax(typeReference.FullyQualifiedName));
                return;
            }

            switch (typeReference.Primitive)
            {
                case PrimitiveType.Date:
                    _referencedNamespaces.Add(SF.ParseName("System"));
                    return;
                case PrimitiveType.Json:
                    _referencedNamespaces.Add(SF.ParseName("Newtonsoft.Json.Linq"));
                    return;
            }

            if (typeReference.Collection != null)
            {
                switch (typeReference.Collection.Kind)
                {
                    case CollectionKind.Map:
                        _referencedNamespaces.Add(SF.ParseName("System.Collections.Generic"));
                        break;
                }

                Add(typeReference.Collection.ElementType);
                return;
            }

            if (typeReference.Union != null)
            {
                foreach (var partialTypeReference in typeReference.Union.Types)
                {
                    Add(partialTypeReference);
                }
            }
        }
    }
}
