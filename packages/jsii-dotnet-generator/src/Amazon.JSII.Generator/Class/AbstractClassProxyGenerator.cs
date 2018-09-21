using System;
using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using Type = Amazon.JSII.JsonModel.Spec.Type;

namespace Amazon.JSII.Generator.Class
{
    public class AbstractClassProxyGenerator : TypeProxyGeneratorBase<ClassType>
    {
        public AbstractClassProxyGenerator(string package, ClassType type, ISymbolMap symbols,
            INamespaceSet namespaces = null)
            : base(package, type, symbols, namespaces)
        {
            if (!type.IsAbstract)
            {
                throw new ArgumentException("Class type must be abstract.", nameof(type));
            }
        }

        protected override SyntaxToken GetProxyTypeNameSyntax()
        {
            return SF.Identifier(Symbols.GetAbstractClassProxyName(Type));
        }

        protected override IEnumerable<PropertyDeclarationSyntax> CreateProperties()
        {
            foreach (Property property in GetAllProperties(Type))
            {
                var generator = new AbstractClassProxyPropertyGenerator(Type, property, Symbols, Namespaces);
                yield return generator.CreateProperty();
            }
        }

        protected override IEnumerable<MemberDeclarationSyntax> CreateMethods()
        {
            foreach (Method method in GetAllMethods(Type))
            {
                var generator = new AbstractClassProxyMethodGenerator(Type, method, Symbols, Namespaces);
                yield return generator.CreateMethod();
            }
        }

        private IEnumerable<Method> GetAllMethods(Type type)
        {
            IEnumerable<Method> GetAllMethodsRecurse(Type currentType, IEnumerable<Method> methods)
            {
                if (currentType is InterfaceType interfaceType)
                {
                    // Get all properties from the interface.
                    methods = methods.Concat(interfaceType.Methods ?? Enumerable.Empty<Method>());

                    // Interfaces can have superinterfaces. Run through them too.
                    if (interfaceType.Interfaces != null)
                    {
                        var superinterfaceMethods = interfaceType.Interfaces.Select(r =>
                                Symbols.GetTypeFromFullyQualifiedName(r.FullyQualifiedName) as
                                    InterfaceType)
                            .SelectMany(i => GetAllMethodsRecurse(i, methods))
                            .ToList();

                        methods = methods.Concat(superinterfaceMethods);
                    }
                }
                else if (currentType is ClassType classType)
                {
                    // Get all methods from the interface
                    methods = methods.Concat(classType.Methods ?? Enumerable.Empty<Method>());

                    if (classType.Interfaces != null)
                    {
                        // Run through all the interfaces.
                        var superinterfaceMethods = classType.Interfaces.Select(r =>
                                Symbols.GetTypeFromFullyQualifiedName(r.FullyQualifiedName) as
                                    InterfaceType)
                            .SelectMany(i => GetAllMethodsRecurse(i, methods))
                            .ToList();

                        methods = methods.Concat(superinterfaceMethods);
                    }

                    // Run through the superclass.
                    if (classType.Base != null)
                    {
                        methods = methods.Concat(GetAllMethodsRecurse(
                            Symbols.GetTypeFromFullyQualifiedName(classType.Base.FullyQualifiedName) as ClassType,
                            methods));
                    }
                }

                return methods;
            }

            // Only get the first declaration encountered, and keep it if it is abstract.
            return GetAllMethodsRecurse(type, Enumerable.Empty<Method>())
                .GroupBy(m => (m.Name,
                    string.Join("",
                        m.Parameters?.Select(p => p.Name + p.Type.FullyQualifiedName) ?? Enumerable.Empty<string>())))
                .Select(g => g.First())
                .Where(m => m.IsAbstract ?? false);
        }

        private IEnumerable<Property> GetAllProperties(Type type)
        {
            IEnumerable<Property> GetAllPropertiesRecurse(Type currentType, IEnumerable<Property> properties)
            {
                if (currentType is InterfaceType interfaceType)
                {
                    // Get all properties from the interface.
                    properties = properties.Concat(interfaceType.Properties ?? Enumerable.Empty<Property>());

                    // Interfaces can have superinterfaces. Run through them too.
                    if (interfaceType.Interfaces != null)
                    {
                        var superinterfaceMethods = interfaceType.Interfaces.Select(r =>
                                Symbols.GetTypeFromFullyQualifiedName(r.FullyQualifiedName) as
                                    InterfaceType)
                            .SelectMany(i => GetAllPropertiesRecurse(i, properties))
                            .ToList();

                        properties = properties.Concat(superinterfaceMethods);
                    }
                }
                else if (currentType is ClassType classType)
                {
                    // Add the properties from the class.
                    properties =
                        properties.Concat(classType.Properties ?? Enumerable.Empty<Property>());

                    // Run through all the interfaces.
                    if (classType.Interfaces != null)
                    {
                        var superinterfaceMethods = classType.Interfaces.Select(r =>
                                Symbols.GetTypeFromFullyQualifiedName(r.FullyQualifiedName) as
                                    InterfaceType)
                            .SelectMany(i => GetAllPropertiesRecurse(i, properties))
                            .ToList();

                        properties = properties.Concat(superinterfaceMethods);
                    }

                    // Run through the superclass.
                    if (classType.Base != null)
                    {
                        properties = properties.Concat(GetAllPropertiesRecurse(
                            Symbols.GetTypeFromFullyQualifiedName(classType.Base.FullyQualifiedName) as ClassType,
                            properties));
                    }
                }

                return properties;
            }

            // Only get the first declaration encountered, and keep it if it is abstract.
            return GetAllPropertiesRecurse(type, Enumerable.Empty<Property>())
                .GroupBy(p => p.Name)
                .Select(g => g.First())
                .Where(p => p.IsAbstract ?? false);
        }
    }
}