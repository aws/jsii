using System;
using System.Collections.Generic;
using System.Reflection;
using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class ReferenceMap : IReferenceMap
    {
        readonly IDictionary<string, DeputyBase> _references = new Dictionary<string, DeputyBase>();
        readonly ITypeCache _types;

        public ReferenceMap(ITypeCache types)
        {
            _types = types ?? throw new ArgumentNullException(nameof(types));
        }

        public void AddNativeReference(ByRefValue reference, DeputyBase nativeReference, bool force)
        {
            if (_references.ContainsKey(reference.Value) && !force)
            {
                throw new ArgumentException(
                    $"Cannot add reference for {reference.Value}: A reference with this name already exists",
                    nameof(reference));
            }

            _references[reference.Value] = nativeReference;
        }

        public DeputyBase GetOrCreateNativeReference(ObjectReference reference)
        {
            return GetOrCreateNativeReference(new ByRefValue((reference["$jsii.byref"] as string)!));
        }

        public DeputyBase GetOrCreateNativeReference(ByRefValue byRefValue)
        {
            if (!_references.ContainsKey(byRefValue.Value))
            {
                ConstructorInfo constructorInfo = GetByRefConstructor();
                _references[byRefValue.Value] = (DeputyBase) constructorInfo.Invoke(new object[] {byRefValue});
            }

            var existing = _references[byRefValue.Value];
            existing.Reference.Merge(byRefValue);
            return existing;

            ConstructorInfo GetByRefConstructor()
            {
                Type type = _types.GetClassType(byRefValue.FullyQualifiedName);

                // If type is an interface or abstract class
                if (type == null || type.IsAbstract)
                {
                    type = _types.GetProxyType(byRefValue.FullyQualifiedName);
                }

                if (type == null)
                {
                    throw new ArgumentException(
                        $"Could not find type with fully qualified name '{byRefValue.FullyQualifiedName}'",
                        nameof(byRefValue)
                    );
                }

                BindingFlags constructorFlags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;
                ConstructorInfo? constructorInfo = type.GetConstructor(constructorFlags, null, new[] {typeof(ByRefValue)}, null);
                if (constructorInfo == null)
                {
                    throw new JsiiError($"Could not find constructor to initialize {type.FullName} with a {typeof(ByRefValue).FullName}");
                }
                return constructorInfo;
            }
        }
    }
}