using Amazon.JSII.JsonModel.Spec;
using System;

namespace Amazon.JSII.Runtime.Services.Converters
{
    public abstract class ValueConverter
    {
        protected readonly ITypeCache _types;

        protected ValueConverter(ITypeCache types)
        {
            _types = types ?? throw new ArgumentNullException(nameof(types));
        }

        public bool TryConvert(TypeReference typeReference, IReferenceMap referenceMap, object value, out object result)
        {
            if (typeReference == null)
            {
                return TryConvertVoid(value, out result);
            }

            bool isOptional = typeReference.IsOptional == true;

            if (typeReference.FullyQualifiedName != null)
            {
                return TryConvertCustomType(referenceMap, value, isOptional, typeReference.FullyQualifiedName, out result);
            }

            if (typeReference.Primitive != null)
            {
                return TryConvertPrimitive(referenceMap, value, isOptional, typeReference.Primitive.Value, out result);
            }

            if (typeReference.Collection != null)
            {
                return TryConvertCollection(referenceMap, value, isOptional, typeReference.Collection, out result);
            }

            if (typeReference.Union != null)
            {
                return TryConvertUnion(referenceMap, value, isOptional, typeReference.Union, out result);
            }

            throw new ArgumentException("Invalid type reference", nameof(typeReference));
        }

        protected bool IsNumeric(System.Type type)
        {
            return
                type.IsAssignableFrom(typeof(short)) ||
                type.IsAssignableFrom(typeof(ushort)) ||
                type.IsAssignableFrom(typeof(int)) ||
                type.IsAssignableFrom(typeof(uint)) ||
                type.IsAssignableFrom(typeof(long)) ||
                type.IsAssignableFrom(typeof(ulong)) ||
                type.IsAssignableFrom(typeof(float)) ||
                type.IsAssignableFrom(typeof(double));
        }

        protected abstract bool TryConvertVoid(object value, out object result);

        protected abstract bool TryConvertClass(IReferenceMap referenceMap, object value, out object result);

        protected abstract bool TryConvertEnum(object value, bool isOptional, string fullyQualifiedName, out object result);

        protected abstract bool TryConvertBoolean(object value, bool isOptional, out object result);

        protected abstract bool TryConvertDate(object value, bool isOptional, out object result);

        protected abstract bool TryConvertJson(object value, out object result);

        protected abstract bool TryConvertNumber(object value, bool isOptional, out object result);

        protected abstract bool TryConvertString(object value, out object result);

        protected abstract bool TryConvertArray(IReferenceMap referenceMap, TypeReference elementType, object value, out object result);

        protected abstract bool TryConvertMap(IReferenceMap referenceMap, TypeReference elementType, object value, out object result);

        protected abstract TypeReference InferType(IReferenceMap referenceMap, object value);

        object ConvertAny(IReferenceMap referenceMap, object value)
        {
            if (value == null)
            {
                return null;
            }

            TypeReference reference = InferType(referenceMap, value);
            if (TryConvert(reference, referenceMap, value, out object result))
            {
                return result;
            }

            throw new ArgumentException($"Could not convert value '{value}' with unrecognized type", nameof(value));
        }

        bool TryConvertCustomType(IReferenceMap referenceMap, object value, bool isOptional, string fullyQualifiedName, out object result)
        {
            if (IsReferenceType())
            {
                return TryConvertClass(referenceMap, value, out result);
            }

            if (_types.GetEnumType(fullyQualifiedName) != null)
            {
                return TryConvertEnum(value, isOptional, fullyQualifiedName, out result);
            }

            result = null;
            return false;

            bool IsReferenceType()
            {
                return
                    _types.GetClassType(fullyQualifiedName) != null ||
                    _types.GetInterfaceType(fullyQualifiedName) != null ||
                    _types.GetProxyType(fullyQualifiedName) != null;
            }
        }

        bool TryConvertPrimitive(IReferenceMap referenceMap, object value, bool isOptional, PrimitiveType primitiveType, out object result)
        {
            switch (primitiveType)
            {
                case PrimitiveType.Any:
                    result = ConvertAny(referenceMap, value);
                    return true;

                case PrimitiveType.Boolean:
                    return TryConvertBoolean(value, isOptional, out result);

                case PrimitiveType.Date:
                    return TryConvertDate(value, isOptional, out result);

                case PrimitiveType.Json:
                    return TryConvertJson(value, out result);

                case PrimitiveType.Number:
                    return TryConvertNumber(value, isOptional, out result);

                case PrimitiveType.String:
                    return TryConvertString(value, out result);

                default:
                    throw new ArgumentException($"Unknown primitive type '{primitiveType}'", nameof(primitiveType));
            }
        }

        bool TryConvertCollection(IReferenceMap referenceMap, object value, bool isOptional, CollectionTypeReference collectionType, out object result)
        {
            switch (collectionType.Kind)
            {
                case CollectionKind.Array:
                    return TryConvertArray(referenceMap, collectionType.ElementType, value, out result);
                case CollectionKind.Map:
                    return TryConvertMap(referenceMap, collectionType.ElementType, value, out result);
                default:
                    throw new ArgumentException($"Unknown collection kind '{collectionType.Kind}'", nameof(collectionType));
            }
        }

        bool TryConvertUnion(IReferenceMap referenceMap, object value, bool isOptional, UnionTypeReference unionType, out object result)
        {
            foreach (var type in unionType.Types)
            {
                if (TryConvert(type, referenceMap, value, out result))
                {
                    return true;
                }
            }

            result = null;
            return false;
        }
    }
}
