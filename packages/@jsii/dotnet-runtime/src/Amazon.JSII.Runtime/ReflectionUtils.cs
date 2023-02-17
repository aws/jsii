using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection;
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Runtime
{
    internal static class ReflectionUtils
    {
        public static FieldInfo GetEnumMember(Type enumType, string name)
        {
            var fieldInfo = enumType.GetFields().FirstOrDefault(field =>
            {
                var attribute = field.GetCustomAttribute<JsiiEnumMemberAttribute>();

                return attribute != null && attribute.Name == name;
            });

            if (fieldInfo == null)
            {
                throw new ArgumentException($"Enum {enumType.Name} does not have a member called {name}", nameof(name));
            }

            return fieldInfo;
        }

        public static MethodInfo GetNativeMethod(Type classType, string name)
        {
            var methodInfo = classType.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic).FirstOrDefault(method =>
            {
                var attribute = method.GetAttribute<JsiiMethodAttribute>();

                return attribute != null && attribute.Name == name;
            });

            if (methodInfo == null)
            {
                throw new ArgumentNullException(nameof(name),
                    $"Class {classType.Name} does not have a method called {name}");
            }

            return methodInfo;
        }

        public static PropertyInfo GetNativeProperty(Type classType, string name)
        {
            var propertyInfo = classType.GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic).FirstOrDefault(property =>
            {
                var attribute = property.GetAttribute<JsiiPropertyAttribute>();

                return attribute != null && attribute.Name == name;
            });

            if (propertyInfo == null)
            {
                throw new ArgumentNullException(nameof(name),
                    $"Class {classType.Name} does not have a property called {name}");
            }

            return propertyInfo;
        }

        public static PropertyInfo? GetIndexer(Type type)
        {
            return type.GetProperties().FirstOrDefault(p => p.GetIndexParameters().Any());
        }

        public static JsiiClassAttribute? GetClassAttribute(Type? type)
        {
            if (type == null)
            {
                return null;
            }

            return type.GetCustomAttribute<JsiiClassAttribute>()
                   ?? GetClassAttribute(type.BaseType);
        }

        /// <summary>
        /// Looks for a Method attribute, starting from the current class hierarchy, and searching on implemented
        /// interfaces if none was found.
        /// </summary>
        /// <param name="method">The method for which an attribute is needed</param>
        /// <param name="inherit">Whether inherited declarations should be searched for (if false, interfaces will NOT be searched)</param>
        /// <typeparam name="T">The attribute type that is desired</typeparam>
        /// <returns>The attribute if one was found, or null</returns>
        [return: MaybeNull]
        internal static T? GetAttribute<T>(this MethodInfo method, bool inherit = true) where T : notnull, Attribute
        {
            var directAttribute = method.GetCustomAttribute<T>(inherit);
            if (directAttribute != null || !inherit) return directAttribute;

            var type = method.ReflectedType;
            if (type == null)
            {
                return null;
            }

            var interfaceMethods = type.GetTypeInfo().ImplementedInterfaces
                .Select(ii => type.GetInterfaceMap(ii))
                .SelectMany(map =>
                    Enumerable.Range(0, map.TargetMethods.Length)
                        .Where(n => map.TargetMethods[n] == method)
                        .Select(n => map.InterfaceMethods[n]));

            return interfaceMethods
                .Select(im => im.GetCustomAttribute<T>(true))
                .FirstOrDefault(attribute => attribute != null);
        }

        /// <summary>
        /// Looks for a Property attribute, starting from the current class hierarchy, and searching on implemented
        /// interfaces if none was found.
        /// </summary>
        /// <param name="property">The property for which an attribute is needed</param>
        /// <param name="inherit">Whether inherited declarations should be searched for (if false, interfaces will NOT be searched)</param>
        /// <typeparam name="T">The attribute type that is desired</typeparam>
        /// <returns>The attribute if one was found, or null</returns>
        [return: MaybeNull]
        internal static T? GetAttribute<T>(this PropertyInfo property, bool inherit = true) where T : notnull, Attribute
        {
            var directAttribute = property.GetCustomAttribute<T>(inherit);
            if (directAttribute != null || !inherit) return directAttribute;

            var type = property.ReflectedType;
            if (type == null)
            {
                return null;
            }

            var interfaceProperties = type.GetTypeInfo().ImplementedInterfaces
                .Select(ii => type.GetInterfaceMap(ii))
                .SelectMany(map =>
                    Enumerable.Range(0, map.TargetMethods.Length)
                        .Where(n => map.TargetMethods[n] == property.GetMethod || map.TargetMethods[n] == property.SetMethod)
                        .Select(n => map.InterfaceMethods[n])
                        .Select(im => map.InterfaceType.GetProperties()
                            .First(prop => prop.GetMethod == im || prop.SetMethod == im)));

            return interfaceProperties
                .Select(ip => ip.GetCustomAttribute<T>(true))
                .FirstOrDefault(attribute => attribute != null);
        }
    }
}
