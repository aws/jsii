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
    public class SymbolMap : ISymbolMap
    {
        readonly IDictionary<string, string> _assemblyNames;
        readonly IDictionary<string, TypeMetadata> _types;

        public SymbolMap()
        {
            _assemblyNames = new Dictionary<string, string>();
            _types = new Dictionary<string, TypeMetadata>();
        }

        public void Add(Assembly assembly)
        {
            if (_assemblyNames.ContainsKey((assembly ?? throw new ArgumentNullException(nameof(assembly))).Name))
            {
                return;
            }

            _assemblyNames[assembly.Name] = assembly.GetNativePackageId();

            var types = assembly.Types?.Values ?? Enumerable.Empty<Type>();

            foreach (Type type in types)
            {
                if (!_types.ContainsKey(type.FullyQualifiedName))
                {
                    _types[type.FullyQualifiedName] = GetMetadata(type);
                }
            }

            // Now that we have a complete list of namespaces, resolve type name conflicts.
            // TODO: Disallow name conflicts at the jsii-authoring level. This requires the
            // TypeScript-to-Jsii compiler to be aware of .NET name-conversion logic.
            ISet<string> namespaceNames = new HashSet<string>(_types.Values.Select(t => t.Namespace));
            foreach (Type type in types)
            {
                TypeMetadata metadata = _types[type.FullyQualifiedName];
                metadata.ResolveTypeNameConflicts(namespaceNames);
            }

            TypeMetadata GetMetadata(Type type)
            {
                switch (type.Kind)
                {
                    case JsonModel.Spec.TypeKind.Class:
                    {
                        var classType = (ClassType) type;
                        if (classType.IsAbstract)
                        {
                            return new AbstractClassTypeMetadata(classType, assembly);
                        }
                        return new ClassTypeMetadata((ClassType)type, assembly);
                    }
                    case JsonModel.Spec.TypeKind.Enum:
                    {
                        return new EnumTypeMetadata((EnumType)type, assembly);   
                    }
                    case JsonModel.Spec.TypeKind.Interface:
                    {
                        return new InterfaceTypeMetadata((InterfaceType)type, assembly);   
                    }
                    default:
                    {
                        throw new ArgumentException($"Type {type.Name} has unrecognized kind {type.Kind}", nameof(type));   
                    }
                }
            }
        }

        #region name

        public string GetAssemblyName(string name)
        {
            name = name ?? throw new ArgumentNullException(nameof(name));

            return _assemblyNames[name];
        }

        public string GetName(Assembly assembly)
        {
            assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));

            return GetAssemblyName(assembly.Name);
        }

        public string GetName(Type type, bool disambiguate = false)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));

            TypeMetadata metadata = _types[type.FullyQualifiedName];

            disambiguate = disambiguate && _types.Values
                .Any(m => m.Type.FullyQualifiedName != metadata.Type.FullyQualifiedName && m.Name == metadata.Name);

            return disambiguate ? metadata.FrameworkFullyQualifiedName : metadata.Name;
        }

        public string GetName(string fullyQualifiedName, bool disambiguate = false)
        {
            return GetName(GetTypeFromFullyQualifiedName(fullyQualifiedName), disambiguate);
        }

        public string GetAbstractClassProxyName(ClassType type, bool disambiguate = false)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));
            
            if (_types[type.FullyQualifiedName] is AbstractClassTypeMetadata metadata)
            {
                return metadata.ProxyName;
            }

            throw new ArgumentException($"Cannot get proxy name for '{type.FullyQualifiedName}' because it is not an abstract class.");
        }

        public string GetInterfaceProxyName(InterfaceType type, bool disambiguate = false)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));

            if (_types[type.FullyQualifiedName] is InterfaceTypeMetadata metadata)
            {
                return metadata.ProxyName;
            }

            throw new ArgumentException($"Cannot get proxy name for '{type.FullyQualifiedName}' because it is not an interface.");
        }

        public string GetInterfaceDefaultName(InterfaceType type, bool disambiguate = false)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));

            if (_types[type.FullyQualifiedName] is InterfaceTypeMetadata metadata)
            {
                return metadata.DefaultName;
            }

            throw new ArgumentException($"Cannot get default name for '{type.FullyQualifiedName}' because it is not an interface.");
        }

        public string GetName(Type type, Method method)
        {
            string fullyQualifiedName = (type ?? throw new ArgumentNullException(nameof(type))).FullyQualifiedName;
            string methodName = (method ?? throw new ArgumentNullException(nameof(method))).Name;

            // We can't look up the method name in _types, because it might belong to a base type that hasn't been parsed yet.
            return NameUtils.ConvertMethodName(method.Name);
        }

        public string GetName(Type type, Property property)
        {
            string fullyQualifiedName = (type ?? throw new ArgumentNullException(nameof(type))).FullyQualifiedName;
            string propertyName = (property ?? throw new ArgumentNullException(nameof(property))).Name;

            // We can't look up the property name in _types, because it might belong to a base type that hasn't been parsed yet.
            return NameUtils.ConvertPropertyName(propertyName);
        }

        public string GetName(Type type, EnumMember enumMember)
        {
            string fullyQualifiedName = (type ?? throw new ArgumentNullException(nameof(type))).FullyQualifiedName;
            string enumMemberName = (enumMember ?? throw new ArgumentNullException(nameof(enumMember))).Name;

            // We can't look up the enum member name in _types, because it might belong to a base type that hasn't been parsed yet.
            return NameUtils.ConvertEnumMemberName(enumMemberName);
        }

        public string GetName(Parameter parameter)
        {
            return NameUtils.ConvertParameterName((parameter ?? throw new ArgumentNullException(nameof(parameter))).Name);
        }

        public SyntaxToken GetNameSyntaxToken(Assembly assembly)
        {
            return SF.Identifier(GetName(assembly ?? throw new ArgumentNullException(nameof(assembly))));
        }

        public SyntaxToken GetNameSyntaxToken(Type type, bool disambiguate = false)
        {
            return SF.Identifier(GetName(type ?? throw new ArgumentNullException(nameof(type)), disambiguate));
        }

        public SyntaxToken GetNameSyntaxToken(string fullyQualifiedName, bool disambiguate = false)
        {
            return GetNameSyntaxToken(GetTypeFromFullyQualifiedName(fullyQualifiedName), disambiguate);
        }

        public SyntaxToken GetInterfaceProxyNameSyntaxToken(InterfaceType type, bool disambiguate = false)
        {
            return SF.Identifier(GetInterfaceProxyName(type ?? throw new ArgumentNullException(nameof(type)), disambiguate));
        }

        public SyntaxToken GetInterfaceDefaultNameSyntaxToken(InterfaceType type, bool disambiguate = false)
        {
            return SF.Identifier(GetInterfaceDefaultName(type ?? throw new ArgumentNullException(nameof(type)), disambiguate));
        }

        public SyntaxToken GetNameSyntaxToken(Type type, Method method)
        {
            return SF.Identifier(GetName(
                type ?? throw new ArgumentNullException(nameof(type)),
                method ?? throw new ArgumentNullException(nameof(method))
            ));
        }

        public SyntaxToken GetNameSyntaxToken(Type type, Property property)
        {
            return SF.Identifier(GetName(
                type ?? throw new ArgumentNullException(nameof(type)),
                property ?? throw new ArgumentNullException(nameof(property))
            ));
        }

        public SyntaxToken GetNameSyntaxToken(Type type, EnumMember enumMember)
        {
            return SF.Identifier(GetName(
                type ?? throw new ArgumentNullException(nameof(type)),
                enumMember ?? throw new ArgumentNullException(nameof(enumMember))
            ));
        }

        public SyntaxToken GetNameSyntaxToken(Parameter parameter)
        {
            return SF.Identifier(GetName(parameter ?? throw new ArgumentNullException(nameof(parameter))));
        }

        public NameSyntax GetNameSyntax(Assembly assembly)
        {
            return SF.IdentifierName(GetName(assembly ?? throw new ArgumentNullException(nameof(assembly))));
        }

        public NameSyntax GetNameSyntax(Type type, bool disambiguate = false)
        {
            return SF.IdentifierName(GetName(type ?? throw new ArgumentNullException(nameof(type)), disambiguate));
        }

        public NameSyntax GetNameSyntax(string fullyQualifiedName, bool disambiguate = false)
        {
            return GetNameSyntax(GetTypeFromFullyQualifiedName(fullyQualifiedName), disambiguate);
        }

        public NameSyntax GetInterfaceProxyNameSyntax(InterfaceType type, bool disambiguate = false)
        {
            return SF.IdentifierName(GetInterfaceProxyName(type ?? throw new ArgumentNullException(nameof(type)), disambiguate));
        }

        public NameSyntax GetInterfaceDefaultNameSyntax(InterfaceType type, bool disambiguate = false)
        {
            return SF.IdentifierName(GetInterfaceDefaultName(type ?? throw new ArgumentNullException(nameof(type)), disambiguate));
        }

        public NameSyntax GetNameSyntax(Type type, Method method)
        {
            return SF.IdentifierName(GetName(
                type ?? throw new ArgumentNullException(nameof(type)),
                method ?? throw new ArgumentNullException(nameof(method))
            ));
        }

        public NameSyntax GetNameSyntax(Type type, Property property)
        {
            return SF.IdentifierName(GetName(
                type ?? throw new ArgumentNullException(nameof(type)),
                property ?? throw new ArgumentNullException(nameof(property))
            ));
        }

        public NameSyntax GetNameSyntax(Type type, EnumMember enumMember)
        {
            return SF.IdentifierName(GetName(
                type ?? throw new ArgumentNullException(nameof(type)),
                enumMember ?? throw new ArgumentNullException(nameof(enumMember))
            ));
        }

        public NameSyntax GetNameSyntax(Parameter parameter)
        {
            return SF.IdentifierName(GetName(parameter ?? throw new ArgumentNullException(nameof(parameter))));
        }

        #endregion

        #region namespace

        public string GetNamespace(Type type)
        {
            string fullyQualifiedName = (type ?? throw new ArgumentNullException(nameof(type))).FullyQualifiedName;

            return _types[fullyQualifiedName].Namespace ?? "";
        }

        public string GetNamespace(string fullyQualifiedName)
        {
            return GetNamespace(GetTypeFromFullyQualifiedName(fullyQualifiedName));
        }

        public SyntaxToken GetNamespaceSyntaxToken(Type type)
        {
            return SF.Identifier(GetNamespace(type ?? throw new ArgumentNullException(nameof(type))));
        }

        public SyntaxToken GetNamespaceSyntaxToken(string fullyQualifiedName)
        {
            return GetNamespaceSyntaxToken(GetTypeFromFullyQualifiedName(fullyQualifiedName));
        }

        public NameSyntax GetNamespaceSyntax(Type type)
        {
            return SF.IdentifierName(GetNamespace(type ?? throw new ArgumentNullException(nameof(type))));
        }

        public NameSyntax GetNamespaceSyntax(string fullyQualifiedName)
        {
            return GetNamespaceSyntax(GetTypeFromFullyQualifiedName(fullyQualifiedName));
        }

        #endregion

        #region package

        public string GetPackage(Type type)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));

            string fullyQualifiedName = type.FullyQualifiedName;

            return _types[fullyQualifiedName].Package;
        }

        public string GetPackage(string fullyQualifiedName)
        {
            return GetPackage(GetTypeFromFullyQualifiedName(fullyQualifiedName));
        }

        public SyntaxToken GetPackageSyntaxToken(Type type)
        {
            return SF.Identifier(GetPackage(type ?? throw new ArgumentNullException(nameof(type))));
        }

        public SyntaxToken GetPackageSyntaxToken(string fullyQualifiedName)
        {
            return GetPackageSyntaxToken(GetTypeFromFullyQualifiedName(fullyQualifiedName));
        }

        public NameSyntax GetPackageSyntax(Type type)
        {
            return SF.IdentifierName(GetPackage(type ?? throw new ArgumentNullException(nameof(type))));
        }

        public NameSyntax GetPackageSyntax(string fullyQualifiedName)
        {
            return GetPackageSyntax(GetTypeFromFullyQualifiedName(fullyQualifiedName));
        }

        #endregion

        public TypeSyntax GetTypeSyntax(TypeReference typeReference)
        {
            bool isOptional = (typeReference ?? throw new ArgumentNullException(nameof(typeReference))).IsOptional == true;

            if (typeReference.Primitive != null)
            {
                switch (typeReference.Primitive.Value)
                {
                    case PrimitiveType.Any:
                        return SF.ParseTypeName("object");
                    case PrimitiveType.Boolean:
                        return SF.ParseTypeName(isOptional ? "bool?" : "bool");
                    case PrimitiveType.Date:
                        return SF.ParseTypeName(isOptional ? "DateTime?" : "DateTime");
                    case PrimitiveType.Json:
                        return SF.ParseTypeName("JObject");
                    case PrimitiveType.Number:
                        return SF.ParseTypeName(isOptional ? "double?" : "double");
                    case PrimitiveType.String:
                        return SF.ParseTypeName("string");
                    default:
                        throw new ArgumentException($"Unexpected primitive type {typeReference.Primitive.Value}", nameof(typeReference));
                }
            }

            if (typeReference.Collection != null)
            {
                TypeSyntax elementType = GetTypeSyntax(typeReference.Collection.ElementType);

                switch (typeReference.Collection.Kind)
                {
                    case CollectionKind.Array:
                        return SF.ArrayType(
                            elementType,
                            SF.List(new[] { SF.ArrayRankSpecifier() })
                        );
                    case CollectionKind.Map:
                        return SF.ParseTypeName($"IDictionary<string, {elementType}>");
                    default:
                        throw new ArgumentException($"Unexpected collection type {typeReference.Collection.Kind}", nameof(typeReference));
                }
            }

            if (typeReference.Union != null)
            {
                return SF.ParseTypeName("object");
            }

            if (typeReference.FullyQualifiedName != null)
            {
                Type type = GetTypeFromFullyQualifiedName(typeReference.FullyQualifiedName);

                return SF.ParseTypeName(GetName(type));
            }

            throw new ArgumentException("Invalid type reference", nameof(typeReference));
        }

        public Type GetTypeFromFullyQualifiedName(string fullyQualifiedName)
        {
            fullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));

            return _types[fullyQualifiedName].Type;
        }
    }
}
