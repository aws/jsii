using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Deputy;
using Newtonsoft.Json.Linq;
using Type = System.Type;

namespace Amazon.JSII.Runtime.Services.Converters
{
    internal sealed class FrameworkToJsiiConverter : ValueConverter, IFrameworkToJsiiConverter
    {
        public FrameworkToJsiiConverter(ITypeCache types) : base(types)
        {
        }

        public bool TryConvert(IOptionalValue? optionalValue, IReferenceMap referenceMap, object? value, out object? result)
        {
            return TryConvert(optionalValue, typeof(object), referenceMap, value, out result);
        }

        protected override bool TryConvertVoid(object? value, out object? result)
        {
            if (value != null)
            {
                throw new ArgumentException($"Expected null, but got {value}", nameof(value));
            }

            result = null;
            return true;
        }

        protected override bool TryConvertClass(Type type, IReferenceMap referenceMap, object? value, out object? result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            if (value is DeputyBase deputyValue)
            {
                result = JObject.FromObject(deputyValue.Reference);
                return true;
            }

            var byValueAttribute = value.GetType().GetCustomAttribute<JsiiByValueAttribute>();
            if (byValueAttribute != null)
            {
                var data = new JObject();
                foreach (var prop in value.GetType().GetProperties())
                {
                    var jsiiProperty = (JsiiPropertyAttribute?) prop.GetCustomAttribute(typeof(JsiiPropertyAttribute), true);
                    if (jsiiProperty == null)
                    {
                        continue;
                    }

                    var propValue = prop.GetValue(value);
                    if (propValue == null)
                    {
                        continue;
                    }

                    if (!TryConvert(jsiiProperty, typeof(object), referenceMap, propValue, out var convertedPropValue) || convertedPropValue == null)
                    {
                        continue;
                    }

                    data.Add(new JProperty(jsiiProperty.Name, convertedPropValue));
                }

                var structInfo = new JObject();
                structInfo.Add(new JProperty("fqn", byValueAttribute.FullyQualifiedName));
                structInfo.Add(new JProperty("data", data));

                var resultObject = new JObject();
                resultObject.Add(new JProperty("$jsii.struct", structInfo));

                result = resultObject;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertEnum(object? value, bool isOptional, string fullyQualifiedName, out object? result)
        {
            if (value == null)
            {
                result = null;
                return isOptional;
            }

            Type valueType = value.GetType();
            JsiiEnumAttribute? attribute = value.GetType().GetCustomAttribute<JsiiEnumAttribute>();

            if (attribute == null || attribute.FullyQualifiedName != fullyQualifiedName)
            {
                result = null;
                return false;
            }

            string? valueName = Enum.GetName(valueType, value);
            FieldInfo? fieldInfo = valueType.GetFields().FirstOrDefault(field => field.Name == valueName);

            if (fieldInfo == null)
            {
                result = null;
                return false;
            }

            JsiiEnumMemberAttribute? memberAttribute = fieldInfo.GetCustomAttribute<JsiiEnumMemberAttribute>();
            if (memberAttribute == null)
            {
                result = null;
                return false;
            }

            result = JObject.FromObject(new EnumValue(fullyQualifiedName, memberAttribute.Name));
            return true;
        }

        protected override bool TryConvertBoolean(object? value, bool isOptional, out object? result)
        {
            if (value == null)
            {
                result = null;
                return isOptional;
            }

            if (value.GetType().IsAssignableFrom(typeof(bool)))
            {
                result = (bool)value;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertDate(object? value, bool isOptional, out object? result)
        {
            if (value == null)
            {
                result = null;
                return isOptional;
            }

            if (value.GetType().IsAssignableFrom(typeof(DateTime)))
            {
                result = JObject.FromObject(new DateValue((DateTime) value));
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertJson(object? value, out object? result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            if (value.GetType().IsAssignableFrom(typeof(JObject)) || value.GetType().IsAssignableFrom(typeof(JArray)))
            {
                result = value;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertNumber(object? value, bool isOptional, out object? result)
        {
            if (value == null)
            {
                result = null;
                return isOptional;
            }

            if (IsNumeric(value.GetType()))
            {
                result = Convert.ToDouble(value, CultureInfo.InvariantCulture);
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertString(object? value, out object? result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            if (value.GetType().IsAssignableFrom(typeof(string)))
            {
                result = (string) value;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertArray(IReferenceMap referenceMap, TypeReference elementType, object? value, out object? result)
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

            Array array = (Array) value;

            JArray resultArray = new JArray();
            foreach (object? element in array)
            {
                if (!TryConvertCollectionElement(element, referenceMap, elementType, out object? convertedElement))
                {
                    result = null;
                    return false;
                }

                resultArray.Add(convertedElement);
            }

            result = resultArray;
            return true;
        }

        protected override bool TryConvertMap(IReferenceMap referenceMap, TypeReference elementType, object? value, out object? result)
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            Type? dictionaryInterface = value.GetType()!
                .GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IDictionary<,>));

            if (dictionaryInterface == null ||
                !typeof(string).IsAssignableFrom(dictionaryInterface.GetGenericArguments()[0]))
            {
                result = null;
                return false;
            }

            IEnumerable<string> keys = (IEnumerable<string>)dictionaryInterface.GetProperty("Keys")!.GetValue(value)!;
            PropertyInfo indexer = ReflectionUtils.GetIndexer(dictionaryInterface)!;

            JObject resultObject = new JObject();
            foreach (string key in keys)
            {
                object? element = indexer.GetValue(value, new object[] {key});

                if (!TryConvertCollectionElement(element, referenceMap, elementType, out object? convertedElement))
                {
                    result = null;
                    return false;
                }

                resultObject.Add(new JProperty(key, convertedElement));
            }

            result = new JObject();
            ((JObject) result).Add(new JProperty("$jsii.map", resultObject));
            return true;
        }

        /// <summary>
        /// Converts a collection element
        /// </summary>
        /// <param name="element">The element to convert in the collection</param>
        /// <param name="referenceMap">The known references map</param>
        /// <param name="elementType">The TypeReference of the element, as seen by Jsii</param>
        /// <param name="convertedElement">out: the converted element</param>
        /// <returns>True if the conversion was successful, false otherwise</returns>
        private bool TryConvertCollectionElement(object? element, IReferenceMap referenceMap, TypeReference elementType, out object? convertedElement)
        {
            if (element is IDictionary<string, object> || element is object[])
            {
                var objectType = InferType(referenceMap, element);
                var nestedType = elementType.Primitive == PrimitiveType.Any ? elementType : objectType.Collection?.ElementType;
                switch (objectType.Collection?.Kind)
                {
                    case CollectionKind.Map:
                        // We should not pass the parent element type as we are
                        // in a map<string, object> containing another map.
                        // If we pass the parent elementType then it will try to convert it as Any
                        // So we can directly convert to another map here, and forgo the type hierarchy
                        // induced by elementType
                        // See https://github.com/aws/aws-cdk/issues/2496
                        return TryConvertMap(referenceMap, nestedType!, element, out convertedElement);
                    case CollectionKind.Array:
                        // The [object] could be another array. (ie Tags)
                        // https://github.com/aws/aws-cdk/issues/3244
                        return TryConvertArray(referenceMap, nestedType!, element, out convertedElement);
                    default:
                        return TryConvert(elementType!, typeof(object), referenceMap, element, out convertedElement);
                }
            }
            else
            {
                return TryConvert(elementType, typeof(object), referenceMap, element, out convertedElement);
            }
        }

        protected override TypeReference InferType(IReferenceMap referenceMap, object value)
        {
            value = value ?? throw new ArgumentNullException(nameof(value));

            return InferType(referenceMap, value.GetType());
        }

        TypeReference InferType(IReferenceMap referenceMap, Type type)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));

            var classAttribute = ReflectionUtils.GetClassAttribute(type);
            if (classAttribute != null)
            {
                return new TypeReference(classAttribute.FullyQualifiedName);
            }

            var enumAttribute = type.GetCustomAttribute<JsiiEnumAttribute>();
            if (enumAttribute != null)
            {
                return new TypeReference(enumAttribute.FullyQualifiedName);
            }

            var interfaceAttribute = type.GetCustomAttribute<JsiiInterfaceAttribute>();
            if (interfaceAttribute != null)
            {
                return new TypeReference(interfaceAttribute.FullyQualifiedName);
            }

            var structAttribute = type.GetCustomAttribute<JsiiByValueAttribute>();
            if (structAttribute != null)
            {
                return new TypeReference(structAttribute.FullyQualifiedName);
            }

            if (typeof(string).IsAssignableFrom(type))
            {
                return new TypeReference(primitive: PrimitiveType.String);
            }

            if (typeof(bool).IsAssignableFrom(type))
            {
                return new TypeReference(primitive: PrimitiveType.Boolean);
            }

            if (IsNumeric(type))
            {
                return new TypeReference(primitive: PrimitiveType.Number);
            }

            if (typeof(DateTime).IsAssignableFrom(type))
            {
                return new TypeReference(primitive: PrimitiveType.Date);
            }

            if (typeof(JObject).IsAssignableFrom(type) || typeof(JArray).IsAssignableFrom(type))
            {
                return new TypeReference(primitive: PrimitiveType.Json);
            }

            if (type.IsArray)
            {
                return new TypeReference
                (
                    collection: new CollectionTypeReference
                    (
                        kind: CollectionKind.Array,
                        elementType: typeof(Object) == type.GetElementType()
                            ? new TypeReference(primitive: PrimitiveType.Any)
                            : InferType(referenceMap, type.GetElementType()!)
                    )
                );
            }

            Type? dictionaryInterface = type.GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IDictionary<,>));
            if (dictionaryInterface != null)
            {
                if (!typeof(string).IsAssignableFrom(dictionaryInterface.GetGenericArguments()[0]))
                {
                    throw new ArgumentException("All dictionaries must have string keys", nameof(type));
                }

                Type elementType = dictionaryInterface.GetGenericArguments()[1];
                return new TypeReference
                (
                    collection: new CollectionTypeReference
                    (
                        kind: CollectionKind.Map,
                        elementType: typeof(Object) == elementType
                            ? new TypeReference(primitive: PrimitiveType.Any)
                            : InferType(referenceMap, elementType)
                    )
                );
            }

            throw new ArgumentException($"Could not infer JSII type for .NET type '{type.Name}'", nameof(type));
        }
    }
}
