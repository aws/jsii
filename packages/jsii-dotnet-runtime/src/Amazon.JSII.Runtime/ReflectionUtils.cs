using System;
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
                JsiiMethodAttribute attribute = method.GetCustomAttribute<JsiiMethodAttribute>();

                return attribute != null && attribute.Name == name;
            });

            if (methodInfo == null)
            {
                throw new ArgumentNullException($"Class {classType.Name} does not have a method called {name}",
                    nameof(name));
            }

            return methodInfo;
        }

        public static PropertyInfo GetNativeProperty(Type classType, string name)
        {
            var propertyInfo = classType.GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic).FirstOrDefault(property =>
            {
                JsiiPropertyAttribute attribute = property.GetCustomAttribute<JsiiPropertyAttribute>();

                return attribute != null && attribute.Name == name;
            });

            if (propertyInfo == null)
            {
                throw new ArgumentNullException($"Class {classType.Name} does not have a property called {name}",
                    nameof(name));
            }

            return propertyInfo;
        }

        public static PropertyInfo GetIndexer(Type type)
        {
            return type.GetProperties().FirstOrDefault(p => p.GetIndexParameters().Any());
        }

        public static JsiiClassAttribute GetClassAttribute(Type type)
        {
            if (type == null)
            {
                return null;
            }

            return type.GetCustomAttribute<JsiiClassAttribute>()
                   ?? GetClassAttribute(type.BaseType);
        }
    }
}