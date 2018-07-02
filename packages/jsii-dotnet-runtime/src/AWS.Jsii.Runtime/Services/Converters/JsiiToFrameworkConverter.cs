﻿using AWS.Jsii.JsonModel.Spec;
using AWS.Jsii.Runtime.Deputy;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace AWS.Jsii.Runtime.Services.Converters
{
    public class JsiiToFrameworkConverter : ValueConverter, IJsiiToFrameworkConverter
    {
        public JsiiToFrameworkConverter(ITypeCache types) : base(types)
        {
        }

        protected override bool TryConvertVoid(object value, out object result)
        {
            if (value != null && (value as JToken)?.Type != JTokenType.Null)
            {
                throw new ArgumentException($"Expected null, but got '{value}'", nameof(value));
            }

            result = null;
            return true;

        }

        protected override bool TryConvertClass(IReferenceMap referenceMap, object value, out object result)
        {
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
            {
                result = null;
                return true;
            }

            if (value is JObject jsonValue && jsonValue.ContainsKey("$jsii.byref"))
            {
                ByRefValue byRefValue = jsonValue.ToObject<ByRefValue>();

                result = referenceMap.GetOrCreateNativeReference(byRefValue);
                return result != null;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertEnum(object value, bool isOptional, string fullyQualifiedName, out object result)
        {
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
            {
                result = null;
                return isOptional;
            }

            if (value is JObject jsonValue && jsonValue.ContainsKey("$jsii.enum"))
            {
                EnumValue enumValue = jsonValue.ToObject<EnumValue>();
                if (enumValue.FullyQualifiedName == fullyQualifiedName)
                {
                    System.Type enumType = _types.GetEnumType(fullyQualifiedName);
                    FieldInfo field = ReflectionUtils.GetEnumMember(enumType, enumValue.MemberName);

                    result = Enum.Parse(enumType, field.Name);
                    return true;
                }
            }

            result = null;
            return false;
        }

        protected override bool TryConvertBoolean(object value, bool isOptional, out object result)
        {
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
            {
                result = null;
                return isOptional;
            }

            if (value.GetType().IsAssignableFrom(typeof(bool)))
            {
                result = value;
                return true;
            }

            if (value is JToken token && token.Type == JTokenType.Boolean)
            {
                result = token.ToObject<bool>();
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertDate(object value, bool isOptional, out object result)
        {
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
            {
                result = null;
                return isOptional;
            }

            if (value is JObject jsonValue && jsonValue.ContainsKey("$jsii.date"))
            {
                result = jsonValue.ToObject<DateValue>().DateTime;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertJson(object value, out object result)
        {
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
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
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
            {
                result = null;
                return isOptional;
            }

            if (IsNumeric(value.GetType()))
            {
                result = Convert.ToDouble(value);
                return true;
            }

            if (value is JToken token)
            {
                switch (token.Type)
                {
                    case JTokenType.Float:
                    case JTokenType.Integer:
                        result = token.ToObject<double>();
                        return true;
                }
            }

            result = null;
            return false;
        }

        protected override bool TryConvertString(object value, out object result)
        {
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
            {
                result = null;
                return true;
            }

            if (value.GetType().IsAssignableFrom(typeof(string)))
            {
                result = (string)value;
                return true;
            }

            if (value is JToken token && token.Type == JTokenType.String)
            {
                result = token.ToObject<string>();
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertArray(IReferenceMap referenceMap, TypeReference elementTypeReference, object value, out object result)
        {
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
            {
                result = null;
                return true;
            }

            if (value is JArray array)
            {
                System.Type elementType = _types.GetFrameworkType(elementTypeReference);
                Array resultArray = Array.CreateInstance(elementType, array.Count);

                for (int i = 0; i < array.Count; i++)
                {
                    if (!TryConvert(elementTypeReference, referenceMap, array[i], out object convertedElement))
                    {
                        throw new ArgumentException("Could not convert all elements of array", nameof(value));
                    }

                    resultArray.SetValue(convertedElement, i);
                }

                result = resultArray;
                return true;
            }

            result = null;
            return false;
        }

        protected override bool TryConvertMap(IReferenceMap referenceMap, TypeReference elementTypeReference, object value, out object result)
        {
            if (value == null || (value as JToken)?.Type == JTokenType.Null)
            {
                result = null;
                return true;
            }

            if (value is JObject jsonObject)
            {
                System.Type elementType = _types.GetFrameworkType(elementTypeReference);
                System.Type dictionaryType = typeof(Dictionary<,>).MakeGenericType(typeof(string), elementType);

                ConstructorInfo dictionaryConstructor = dictionaryType.GetConstructor(new System.Type[] { });
                MethodInfo dictionaryAddMethod = dictionaryType.GetMethod("Add", new System.Type[] { typeof(string), elementType });
                object dictionary = dictionaryConstructor.Invoke(new object[] { });

                foreach (JProperty property in jsonObject.Properties())
                {
                    if (!TryConvert(elementTypeReference, referenceMap, property.Value, out object convertedElement))
                    {
                        throw new ArgumentException("Could not convert all elements of map", nameof(value));
                    }

                    dictionaryAddMethod.Invoke(dictionary, new object[] { property.Name, convertedElement });
                }

                result = dictionary;
                return true;
            }

            result = null;
            return false;
        }

        protected override TypeReference InferType(IReferenceMap referenceMap, object value)
        {
            value = value ?? throw new ArgumentNullException(nameof(value));

            if (value is JToken token)
            {
                switch (token.Type)
                {
                    case JTokenType.Object:
                        JObject jObject = (JObject)token;
                        if (jObject.ContainsKey("$jsii.date"))
                        {
                            return new TypeReference(primitive: PrimitiveType.Date);
                        }
                        if (jObject.ContainsKey("$jsii.enum"))
                        {
                            return new TypeReference(jObject.ToObject<EnumValue>().FullyQualifiedName);
                        }
                        if (jObject.ContainsKey("$jsii.byref"))
                        {
                            return new TypeReference(jObject.ToObject<ByRefValue>().FullyQualifiedName);
                        }

                        // At this point, we can't distinguish between a PrimitiveType.Json and a CollectionKind.Map,
                        // so we default to CollectionKind.Map.
                        return new TypeReference(
                            collection: new CollectionTypeReference(
                                kind: CollectionKind.Map,
                                elementType: new TypeReference(primitive: PrimitiveType.Any)
                            )
                        );

                    case JTokenType.Array:
                        return new TypeReference
                        (
                            collection: new CollectionTypeReference
                            (
                                CollectionKind.Array,
                                new TypeReference(primitive: PrimitiveType.Any)
                            )
                        );

                    case JTokenType.Boolean:
                        return new TypeReference(primitive: PrimitiveType.Boolean);
                    case JTokenType.String:
                        return new TypeReference(primitive: PrimitiveType.String);
                    case JTokenType.Float:
                    case JTokenType.Integer:
                        return new TypeReference(primitive: PrimitiveType.Number);
                    default:
                        throw new ArgumentException($"Value has unexpected token type {token.Type}", nameof(value));
                }
            }

            System.Type type = value.GetType();

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

            throw new ArgumentException($"Value has unexpected type {type.Name}", nameof(value));
        }
    }
}
