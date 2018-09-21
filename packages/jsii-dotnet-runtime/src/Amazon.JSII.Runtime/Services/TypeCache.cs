using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Deputy;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Assembly = System.Reflection.Assembly;
using Type = System.Type;

namespace Amazon.JSII.Runtime.Services
{
    public class TypeCache : ITypeCache
    {
        const string ProxySuffix = "$Proxy";

        readonly ISet<string> _assemblies;
        readonly IDictionary<string, Type> _types;
        readonly object _lock = new object();
        readonly ILogger _logger;

        public TypeCache(ILoggerFactory loggerFactory)
        {
            loggerFactory = loggerFactory ?? throw new ArgumentNullException(nameof(loggerFactory));
            _logger = loggerFactory.CreateLogger<NodeProcess>();

            _assemblies = new HashSet<string>();
            _types = new Dictionary<string, Type>();
        }

        public Type GetClassType(string fullyQualifiedName)
        {
            return GetType<JsiiClassAttribute>(fullyQualifiedName);
        }

        public Type GetEnumType(string fullyQualifiedName)
        {
            return GetType<JsiiEnumAttribute>(fullyQualifiedName);
        }

        public Type GetInterfaceType(string fullyQualifiedName)
        {
            return GetType<JsiiInterfaceAttribute>(fullyQualifiedName);
        }

        public Type GetProxyType(string fullyQualifiedName)
        {
            return GetType<JsiiInterfaceProxyAttribute>(fullyQualifiedName + ProxySuffix);
        }

        public Type GetFrameworkType(TypeReference reference)
        {
            bool isOptional = reference.IsOptional == true;

            if (reference.FullyQualifiedName != null)
            {
                Type classType = GetClassType(reference.FullyQualifiedName);
                if (classType != null)
                {
                    return classType;
                }

                Type enumType = GetEnumType(reference.FullyQualifiedName);
                if (enumType != null)
                {
                    return MakeNullableIfOptional(enumType);
                }

                throw new ArgumentException("Type reference has a fully qualified name, but is neither a class nor an enum", nameof(reference));
            }

            if (reference.Primitive != null)
            {
                switch (reference.Primitive)
                {
                    case PrimitiveType.Any:
                        return typeof(object);
                    case PrimitiveType.Boolean:
                        return MakeNullableIfOptional(typeof(bool));
                    case PrimitiveType.Date:
                        return MakeNullableIfOptional(typeof(DateTime));
                    case PrimitiveType.Json:
                        return typeof(JObject);
                    case PrimitiveType.Number:
                        return MakeNullableIfOptional(typeof(double));
                    case PrimitiveType.String:
                        return typeof(string);
                    default:
                        throw new ArgumentException($"Unknown primitive type {reference.Primitive}", nameof(reference));

                }
            }

            if (reference.Collection != null)
            {
                Type elementType = GetFrameworkType(reference.Collection.ElementType);
                switch (reference.Collection.Kind)
                {
                    case CollectionKind.Array:
                        return elementType.MakeArrayType();
                    case CollectionKind.Map:
                        return typeof(IDictionary<,>).MakeGenericType(typeof(string), elementType);
                    default:
                        throw new ArgumentException($"Unknown collection kind {reference.Collection.Kind}", nameof(reference));
                }
            }

            if (reference.Union != null)
            {
                return typeof(object);
            }

            throw new ArgumentException("Invalid type reference", nameof(reference));

            Type MakeNullableIfOptional(Type type)
            {
                return isOptional ? typeof(Nullable<>).MakeGenericType(type) : type;
            }
        }

        Type GetType<T>(string fullyQualifiedName) where T : JsiiTypeAttributeBase
        {
            Type type = null;

            lock (_lock)
            {
                Refresh();

                if (_types.ContainsKey(fullyQualifiedName))
                {
                    type = _types[fullyQualifiedName];
                }
            }

            return type?.GetCustomAttribute<T>() == null ?
                null :
                type;
        }

        void Refresh()
        {
            // In some scenarios, new assemblies can be dynamically loaded at runtime.
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();
            foreach (Assembly assembly in assemblies)
            {
                if (!_assemblies.Contains(assembly.FullName))
                {
                    _assemblies.Add(assembly.FullName);
                    CacheTypes(assembly);
                }
            }
        }

        void CacheTypes(Assembly assembly)
        {
            foreach (Type type in GetTypes(assembly).Where(t => t != null))
            {
                var attribute = type.GetCustomAttribute<JsiiTypeAttributeBase>();
                if (attribute != null)
                {
                    string fullyQualifiedName = attribute.FullyQualifiedName;
                    if (attribute is JsiiInterfaceProxyAttribute)
                    {
                        fullyQualifiedName += ProxySuffix;
                    }

                    if (_types.ContainsKey(fullyQualifiedName))
                    {
                        throw new InvalidOperationException(
                            $"Found multiple types with fully qualified name '{fullyQualifiedName}'." +
                            " Fully qualified names must be unique."
                        );
                    }

                    _types[fullyQualifiedName] = type;
                }
            }
        }

        IEnumerable<Type> GetTypes(Assembly assembly)
        {
            try
            {
                return assembly.GetTypes();
            }
            catch (ReflectionTypeLoadException e)
            {
                _logger.LogWarning("ReflectionTypeLoadException while searching for JSII types. Loader exceptions:");
                foreach (Exception loaderException in e.LoaderExceptions)
                {
                    _logger.LogWarning(loaderException.ToString());
                }

                return e.Types;
            }
        }
    }
}
