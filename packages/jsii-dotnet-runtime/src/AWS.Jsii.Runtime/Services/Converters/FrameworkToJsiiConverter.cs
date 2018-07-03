using AWS.Jsii.JsonModel.Spec;
using AWS.Jsii.Runtime.Deputy;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace AWS.Jsii.Runtime.Services.Converters
{
    public class FrameworkToJsiiConverter : ValueConverter, IFrameworkToJsiiConverter
    {
        public FrameworkToJsiiConverter(ITypeCache types) : base(types)
        {
        }

        protected override bool TryConvertVoid(object value, out object result)
        {
            if (value != null)
            {
                throw new ArgumentException($"Expected null, but got {value}", nameof(value));
            }

            result = null;
            return true;
        }

        protected override bool TryConvertClass(IReferenceMap referenceMap, object value, out object result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            System.Type type = value.GetType();

            if (type.GetCustomAttribute<JsiiInterfaceProxyAttribute>() != null)
            {
                throw new ArgumentException
                (
                    "Interface proxies are one-way (jsii to framework). " +
                    "They may not be converted back to jsii. " +
                    "Instead, use a concrete type that implements the interface.",
                    nameof(value)
                );
            }

            if (value is DeputyBase deputyValue)
            {
                result = deputyValue.Reference;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertEnum(object value, bool isOptional, string fullyQualifiedName, out object result)
        {
            if (value == null)
            {
                result = null;
                return isOptional;
            }

            System.Type valueType = value.GetType();
            JsiiEnumAttribute attribute = value.GetType().GetCustomAttribute<JsiiEnumAttribute>();

            if (attribute == null || attribute.FullyQualifiedName != fullyQualifiedName)
            {
                result = null;
                return false;
            }

            string valueName = Enum.GetName(valueType, value);
            FieldInfo fieldInfo = valueType.GetFields().FirstOrDefault(field => field.Name == valueName);

            if (fieldInfo == null)
            {
                result = null;
                return false;
            }

            JsiiEnumMemberAttribute memberAttribute = fieldInfo.GetCustomAttribute<JsiiEnumMemberAttribute>();
            if (memberAttribute == null)
            {
                result = null;
                return false;
            }

            result = new EnumValue(fullyQualifiedName, memberAttribute.Name);
            return true;
        }

        protected override bool TryConvertBoolean(object value, bool isOptional, out object result)
        {
            if (value == null)
            {
                result = null;
                return isOptional;
            }

            if (value.GetType().IsAssignableFrom(typeof(bool)))
            {
                result = value;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertDate(object value, bool isOptional, out object result)
        {
            if (value == null)
            {
                result = null;
                return isOptional;
            }

            if (value.GetType().IsAssignableFrom(typeof(DateTime)))
            {
                result = new DateValue((DateTime)value);
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertJson(object value, out object result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            if (value.GetType().IsAssignableFrom(typeof(JObject)))
            {
                result = value;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertNumber(object value, bool isOptional, out object result)
        {
            if (value == null)
            {
                result = null;
                return isOptional;
            }

            if (IsNumeric(value.GetType()))
            {
                result = Convert.ToDouble(value);
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertString(object value, out object result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            if (value.GetType().IsAssignableFrom(typeof(string)))
            {
                result = (string)value;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertArray(IReferenceMap referenceMap, TypeReference elementType, object value, out object result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            if (!value.GetType().IsArray)
            {
                result = null;
                return false;
            }

            Array array = (Array)value;

            JArray resultArray = new JArray();
            foreach (object element in array)
            {
                if (!TryConvert(elementType, referenceMap, element, out object convertedElement))
                {
                    result = null;
                    return false;
                }

                if (convertedElement != null && convertedElement.GetType() == typeof(ByRefValue))
                {
                    convertedElement = JObject.FromObject(convertedElement);
                }

                resultArray.Add(convertedElement);
            }

            result = resultArray;
            return true;
        }

        protected override bool TryConvertMap(IReferenceMap referenceMap, TypeReference elementType, object value, out object result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            System.Type valueType = value.GetType();
            System.Type dictionaryInterface = valueType.GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IDictionary<,>));

            if (dictionaryInterface == null || !dictionaryInterface.GetGenericArguments()[0].IsAssignableFrom(typeof(string)))
            {
                result = null;
                return false;
            }

            IEnumerable<string> keys = (IEnumerable<string>)valueType.GetProperty("Keys").GetValue(value);
            PropertyInfo indexer = ReflectionUtils.GetIndexer(valueType);

            JObject resultObject = new JObject();
            foreach (string key in keys)
            {
                object element = indexer.GetValue(value, new object[] { key });
                if (!TryConvert(elementType, referenceMap, element, out object convertedElement))
                {
                    result = null;
                    return false;
                }

                resultObject.Add(new JProperty(key, convertedElement));
            }

            result = resultObject;
            return true;
        }

        protected override TypeReference InferType(IReferenceMap referenceMap, object value)
        {
            value = value ?? throw new ArgumentNullException(nameof(value));

            return InferType(referenceMap, value.GetType());
        }

        TypeReference InferType(IReferenceMap referenceMap, System.Type type)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));

            JsiiClassAttribute classAttribute = ReflectionUtils.GetClassAttribute(type);
            if (classAttribute != null)
            {
                return new TypeReference(classAttribute.FullyQualifiedName);
            }

            JsiiEnumAttribute enumAttribute = type.GetCustomAttribute<JsiiEnumAttribute>();
            if (enumAttribute != null)
            {
                return new TypeReference(enumAttribute.FullyQualifiedName);
            }

            if (type.IsAssignableFrom(typeof(string)))
            {
                return new TypeReference(primitive: PrimitiveType.String);
            }

            if (type.IsAssignableFrom(typeof(bool)))
            {
                return new TypeReference(primitive: PrimitiveType.Boolean);
            }

            if (IsNumeric(type))
            {
                return new TypeReference(primitive: PrimitiveType.Number);
            }

            if (type.IsAssignableFrom(typeof(DateTime)))
            {
                return new TypeReference(primitive: PrimitiveType.Date);
            }

            if (type.IsAssignableFrom(typeof(JObject)))
            {
                return new TypeReference(primitive: PrimitiveType.Json);
            }

            if (type.IsArray)
            {
                return new TypeReference
                (
                    collection: new CollectionTypeReference
                    (
                        CollectionKind.Array,
                        InferType(referenceMap, type.GetElementType())
                    )
                );
            }

            System.Type dictionaryInterface = type.GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IDictionary<,>));
            if (dictionaryInterface != null)
            {
                if (!dictionaryInterface.GetGenericArguments()[0].IsAssignableFrom(typeof(string)))
                {
                    throw new ArgumentException("All dictionaries must have string keys", nameof(type));
                }

                System.Type elementType = dictionaryInterface.GetGenericArguments()[1];
                return new TypeReference
                (
                    collection: new CollectionTypeReference
                    (
                        CollectionKind.Map,
                        InferType(referenceMap, elementType)
                    )
                );
            }

            throw new ArgumentException($"Could not infer JSII type for .NET type '{type.Name}'", nameof(type));
        }
    }
}
