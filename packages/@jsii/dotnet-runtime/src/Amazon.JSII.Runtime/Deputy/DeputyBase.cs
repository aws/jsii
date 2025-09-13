using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.JsonModel.Api.Response;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security.Authentication.ExtendedProtection;
using Newtonsoft.Json;
using Type = System.Type;

namespace Amazon.JSII.Runtime.Deputy
{
    public abstract class DeputyBase : IConvertible
    {
        /// <summary>
        /// Each deputy type needs a protected constructor that accepts 'create' parameters from
        /// children. But some types will also have a public constructor that takes a single object[]
        /// argument. So for the protected constructor, we pass DeputyProps instead of object[] to
        /// prevent overload ambiguity.
        /// </summary>
        protected sealed class DeputyProps
        {
            public DeputyProps(object?[]? arguments = null)
            {
                Arguments = arguments ?? Array.Empty<object?>();
            }

            public object?[] Arguments { get; }
        }

        private const BindingFlags StaticMemberFlags = BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic;
        private const BindingFlags InstanceMemberFlags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;

        protected DeputyBase(DeputyProps? props = null)
        {
            var type = GetType();
            JsiiTypeAttributeBase.Load(type.Assembly);

            // If this is a native object, it won't have any jsii metadata.
            var attribute = ReflectionUtils.GetClassAttribute(type);
            var fullyQualifiedName = attribute?.FullyQualifiedName ?? "Object";
            var parameters = attribute?.Parameters ?? Array.Empty<Parameter>();

            var serviceProvider = ServiceContainer.ServiceProvider;
            var client = serviceProvider.GetRequiredService<IClient>();
            var response = client.Create(
                fullyQualifiedName,
                ConvertArguments(parameters, props?.Arguments ?? Array.Empty<object>()),
                GetOverrides(),
                GetInterfaces()
            );

            Reference = new ByRefValue((response["$jsii.byref"] as string)!);
            var referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            referenceMap.AddNativeReference(Reference, this, true);

            Override[] GetOverrides()
            {
                return GetMethodOverrides().Concat(GetPropertyOverrides()).ToArray();
            }

            IEnumerable<Override> GetMethodOverrides()
            {
                var typeMethods = type.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic)
                    .Where(method => !method.DeclaringType?.Equals(typeof(DeputyBase)) ?? false)
                    .Where(method => !method.DeclaringType?.Equals(typeof(object)) ?? false);
                foreach (var method in typeMethods)
                {
                    var inheritedAttribute = method.GetAttribute<JsiiMethodAttribute>();
                    var uninheritedAttribute = method.GetAttribute<JsiiMethodAttribute>(false);

                    if (inheritedAttribute != null && uninheritedAttribute == null)
                    {
                        yield return new Override(method: (inheritedAttribute ?? uninheritedAttribute)!.Name);
                    }
                }
            }

            IEnumerable<Override> GetPropertyOverrides()
            {
                var typeProperties = type.GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic)
                        .Where(prop => !prop.DeclaringType?.Equals(typeof(DeputyBase)) ?? false)
                        .Where(prop => !prop.DeclaringType?.Equals(typeof(object)) ?? false);
                foreach (var property in typeProperties)
                {
                    var inheritedAttribute = property.GetAttribute<JsiiPropertyAttribute>();
                    var uninheritedAttribute = property.GetAttribute<JsiiPropertyAttribute>(false);

                    if (inheritedAttribute != null && uninheritedAttribute == null)
                    {
                        yield return new Override(property: (inheritedAttribute ?? uninheritedAttribute)!.Name);
                    }
                }
            }

            string[] GetInterfaces()
            {
                return type.GetInterfaces()
                    .Select(iface => iface.GetCustomAttribute<JsiiInterfaceAttribute>())
                    .Where(jsiiIface => jsiiIface != null)
                    .Select(jsiiIface => jsiiIface!.FullyQualifiedName)
                    .ToArray();
            }
        }

        protected DeputyBase(ByRefValue reference)
        {
            Reference = reference ?? throw new ArgumentNullException(nameof(reference));

            if (reference.IsProxy) return;
            var serviceProvider = ServiceContainer.ServiceProvider;
            var referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            referenceMap.AddNativeReference(Reference, this);
        }

        internal ByRefValue Reference { get; }

        #region GetProperty

        [return: MaybeNull]
        protected static T GetStaticProperty<T>(System.Type type, [CallerMemberName] string? propertyName = null)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            JsiiTypeAttributeBase.Load(type.Assembly);

            var classAttribute = ReflectionUtils.GetClassAttribute(type)!;
            var propertyAttribute = GetStaticPropertyAttribute(type, propertyName);

            return GetPropertyCore<T>(
                propertyAttribute,
                client => client.StaticGet(classAttribute.FullyQualifiedName, propertyAttribute.Name)
            );
        }

        [return: MaybeNull]
        protected T GetInstanceProperty<T>([CallerMemberName] string? propertyName = null)
        {
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            var propertyAttribute = GetInstancePropertyAttribute(propertyName);

            return GetPropertyCore<T>(
                propertyAttribute,
                client => client.Get(Reference.ToObjectReference(), propertyAttribute.Name)
            );
        }

        [return: MaybeNull]
        private static T GetPropertyCore<T>(JsiiPropertyAttribute propertyAttribute, Func<IClient, GetResponse> getFunc)
        {
            var serviceProvider = ServiceContainer.ServiceProvider;
            var client = serviceProvider.GetRequiredService<IClient>();

            var response = getFunc(client);

            var converter = serviceProvider.GetRequiredService<IJsiiToFrameworkConverter>();
            var referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            if (!converter.TryConvert(propertyAttribute, typeof(T), referenceMap, response.Value, out object? frameworkValue))
            {
                throw new ArgumentException($"Could not convert value '{response.Value}' for property '{propertyAttribute.Name}'", nameof(getFunc));
            }

            return (T)frameworkValue!;
        }

        #endregion

        #region SetProperty

        protected static void SetStaticProperty<T>(System.Type type, T value, [CallerMemberName] string? propertyName = null)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            JsiiTypeAttributeBase.Load(type.Assembly);

            var classAttribute = ReflectionUtils.GetClassAttribute(type)!;
            var propertyAttribute = GetStaticPropertyAttribute(type, propertyName);

            SetPropertyCore(
                value,
                propertyAttribute,
                (client, jsiiValue) => client.StaticSet(classAttribute.FullyQualifiedName, propertyAttribute.Name, jsiiValue)
            );
        }

        protected void SetInstanceProperty<T>(T value, [CallerMemberName] string? propertyName = null)
        {
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            var propertyAttribute = GetInstancePropertyAttribute(propertyName);

            SetPropertyCore(
                value,
                propertyAttribute,
                (client, jsiiValue) => client.Set(Reference.ToObjectReference(), propertyAttribute.Name, jsiiValue)
            );
        }

        private static void SetPropertyCore<T>(T value, JsiiPropertyAttribute propertyAttribute, Action<IClient, object?> setAction)
        {
            var serviceProvider = ServiceContainer.ServiceProvider;
            var converter = serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            var referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            if (!converter.TryConvert(propertyAttribute, referenceMap, value, out object? jsiiValue))
            {
                throw new ArgumentException($"Could not set property '{propertyAttribute.Name}' to '{value}'", nameof(value));
            }

            var client = serviceProvider.GetRequiredService<IClient>();
            setAction(client, jsiiValue);
        }

        #endregion

        #region InvokeMethod

        protected static void InvokeStaticVoidMethod(System.Type type, System.Type[] parameterTypes, object?[] arguments, [CallerMemberName] string methodName = "")
        {
            InvokeStaticMethod<object>(type, parameterTypes, arguments, methodName);
        }

        protected void InvokeInstanceVoidMethod(System.Type[] parameterTypes, object?[] arguments, [CallerMemberName] string methodName = "")
        {
            InvokeInstanceMethod<object>(parameterTypes, arguments, methodName);
        }

        [return: MaybeNull]
        protected static T InvokeStaticMethod<T>(System.Type type, System.Type[] parameterTypes, object?[] arguments, [CallerMemberName] string methodName = "")
        {
            JsiiTypeAttributeBase.Load(type.Assembly);

            var methodAttribute = GetStaticMethodAttribute(type, methodName, parameterTypes);
            var classAttribute = ReflectionUtils.GetClassAttribute(type)!;

            return InvokeMethodCore<T>(
                methodAttribute,
                arguments,
                (client, args) => throw new NotSupportedException("Async static methods are currently not supported"),
                (client, args) => client.StaticInvoke(
                    classAttribute.FullyQualifiedName,
                    methodAttribute.Name,
                    ConvertArguments(methodAttribute.Parameters, arguments)
                )
            );
        }

        [return: MaybeNull]
        protected T InvokeInstanceMethod<T>(System.Type[] parameterTypes, object?[] arguments, [CallerMemberName] string methodName = "")
        {
            var methodAttribute = GetInstanceMethodAttribute(methodName, parameterTypes);

            return InvokeMethodCore<T>(
                methodAttribute,
                arguments,
                (client, args) => client.Begin(
                    Reference.ToObjectReference(),
                    methodAttribute.Name,
                    ConvertArguments(methodAttribute.Parameters, arguments)
                ),
                (client, args) => client.Invoke(
                    Reference.ToObjectReference(),
                    methodAttribute.Name,
                    ConvertArguments(methodAttribute.Parameters, arguments)
                )
            );
        }

        [return: MaybeNull]
        private static T InvokeMethodCore<T>(
            JsiiMethodAttribute methodAttribute,
            object?[] arguments,
            Func<IClient, object?[], BeginResponse> beginFunc,
            Func<IClient, object?[], InvokeResponse> invokeFunc
        )
        {
            var serviceProvider = ServiceContainer.ServiceProvider;
            var client = serviceProvider.GetRequiredService<IClient>();
            var converter = serviceProvider.GetRequiredService<IJsiiToFrameworkConverter>();
            var referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();

            var result = GetResult();
            if (!converter.TryConvert(methodAttribute.Returns, typeof(T), referenceMap, result, out object? frameworkValue))
            {
                throw new NotSupportedException($"Could not convert result '{result}' for method '{methodAttribute.Name}'");
            }

            return (T)frameworkValue!;

            object? GetResult()
            {
                var args = ConvertArguments(methodAttribute.Parameters, arguments);

                if (methodAttribute.IsAsync)
                {
                    var beginResponse = beginFunc(client, args);

                    InvokeCallbacks();

                    return client.End(beginResponse.PromiseId).Result;
                }

                var invokeResponse = invokeFunc(client, args);

                return invokeResponse.Result;
            }
        }

        private static void InvokeCallbacks()
        {
            var serviceProvider = ServiceContainer.ServiceProvider;
            var client = serviceProvider.GetRequiredService<IClient>();
            var converter = serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            var referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();

            var callbacks = client.Callbacks();
            while (callbacks.Callbacks.Any())
            {
                foreach (var callback in callbacks.Callbacks)
                {
                    var result = callback.InvokeCallback(referenceMap, converter, out var error);
                    var namedError = error is null ? null : new NamedError(error);
                    client.Complete(callback.CallbackId, namedError, result);
                }

                callbacks = client.Callbacks();
            }
        }

        #endregion

        #region ConvertArguments

        private static object?[] ConvertArguments(Parameter[] parameters, params object?[] arguments)
        {
            var serviceProvider = ServiceContainer.ServiceProvider;

            if (parameters.Length == 0 && arguments.Length == 0)
            {
                return Array.Empty<object>();
            }

            if (parameters.Length != arguments.Length)
            {
                throw new ArgumentException(
                    $"Arguments do not match method parameters (method has {parameters.Length} parameters, {arguments.Length} arguments received)",
                    nameof(arguments));
            }

            var cleanedArgs = new List<object?>(arguments);
            var cleanedParams = new List<Parameter>(parameters);

            // Handling variadic parameters (null array, empty array, one value array, n values array..)
            if (parameters.Length > 0 && parameters.Last().IsVariadic)
            {
                // Last parameter is variadic, let's explode the .NET attributes
                var variadicValues = arguments.Last() as Array;

                // We remove the last argument (the variadic array);
                cleanedArgs.RemoveAt(cleanedArgs.Count - 1);

                // A null value could be passed as a params
                if (variadicValues != null)
                {
                    // We save the last parameter to backfill the parameters list
                    var lastParameter = cleanedParams.Last();

                    for (var i = 0; i < variadicValues.Length; i++)
                    {
                        // Backfill the arguments
                        cleanedArgs.Add(variadicValues.GetValue(i));

                        // Backfill the parameters if necessary, for a 1:1 mirror with the cleanedArgs
                        if (cleanedArgs.Count != cleanedParams.Count)
                            cleanedParams.Add(lastParameter);
                    }
                }
            }

            var converter = serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            var referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();

            return cleanedParams.Zip(cleanedArgs, (parameter, frameworkArgument) =>
            {
                if (!converter.TryConvert(parameter, referenceMap, frameworkArgument, out object? jsiiArgument))
                {
                    throw new ArgumentException($"Could not convert argument '{frameworkArgument}' to Jsii", nameof(arguments));
                }

                return jsiiArgument;
            }).ToArray();
        }

        #endregion

        #region GetPropertyAttribute

        private static JsiiPropertyAttribute GetStaticPropertyAttribute(System.Type type, string propertyName)
        {
            return GetPropertyAttributeCore(type, propertyName, StaticMemberFlags);
        }

        private JsiiPropertyAttribute GetInstancePropertyAttribute(string propertyName)
        {
            return GetPropertyAttributeCore(GetType(), propertyName, InstanceMemberFlags);
        }

        private static JsiiPropertyAttribute GetPropertyAttributeCore(System.Type type, string propertyName, BindingFlags bindingFlags)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            var propertyInfo = type.GetProperty(propertyName, bindingFlags);
            if (propertyInfo == null)
            {
                throw new ArgumentException($"Property {propertyName} does not exist", nameof(propertyName));
            }

            var attribute = propertyInfo.GetCustomAttribute<JsiiPropertyAttribute>();
            if (attribute == null)
            {
                throw new ArgumentException($"Property {propertyName} is missing JsiiPropertyAttribute", nameof(propertyName));
            }

            return attribute;
        }

        #endregion

        #region GetMethodAttribute

        private static JsiiMethodAttribute GetStaticMethodAttribute(System.Type type, string methodName, System.Type[] parameterTypes)
        {
            return GetMethodAttributeCore(type, methodName, parameterTypes, StaticMemberFlags);
        }

        private JsiiMethodAttribute GetInstanceMethodAttribute(string methodName, System.Type[] parameterTypes)
        {
            return GetMethodAttributeCore(GetType(), methodName, parameterTypes, InstanceMemberFlags);
        }

        private static JsiiMethodAttribute GetMethodAttributeCore(System.Type type, string methodName, System.Type[] parameterTypes, BindingFlags bindingFlags)
        {
            methodName = methodName ?? throw new ArgumentNullException(nameof(methodName));
            type = type ?? throw new ArgumentNullException(nameof(type));
            parameterTypes = parameterTypes ?? throw new ArgumentNullException(nameof(parameterTypes));

            var methodInfo = type.GetMethod(methodName, bindingFlags);
            // Don't need all this because we don't have overloading anyway.
            // var methodInfo = type.GetMethod(methodName, bindingFlags, null, parameterTypes, Array.Empty<ParameterModifier>());
            if (methodInfo == null)
            {
                throw new ArgumentException($"Method {methodName} does not exist", nameof(methodName));
            }

            var methodAttribute = methodInfo.GetCustomAttribute<JsiiMethodAttribute>();
            if (methodAttribute == null)
            {
                throw new ArgumentException($"Method {methodName} is missing JsiiMethodAttribute", nameof(methodName));
            }

            return methodAttribute;
        }

        #endregion

        #region IConvertible

        /// <summary>
        /// Unsafely obtains a proxy of a given type for this instance. This method allows obtaining a proxy instance
        /// that is not known to be supported by the backing object instance; in which case the behavior of any
        /// operation that is not supported by the backing instance is undefined.
        /// </summary>
        /// <typeparam name="T">
        /// A jsii-managed interface to obtain a proxy for.
        /// This interface must carry a <see cref="JsiiInterfaceAttribute" /> attribute.
        /// </typeparam>
        /// <returns>
        /// An instance of <c>T</c>
        /// </returns>
        /// <exception cref="ArgumentException">
        /// If the type provided for <c>T</c> does not carry the <see cref="JsiiInterfaceAttribute" /> attribute.
        /// </exception>
        public T UnsafeCast<T>() where T: class
        {
            if (this is T result)
            {
                return result;
            }

            try
            {
                return (T) Convert.ChangeType(this, typeof(T), CultureInfo.InvariantCulture);
            }
            catch (InvalidCastException)
            {
                // At this point, we are converting to a type that we don't know for sure is applicable
                if (MakeProxy(typeof(T), true, out var proxy))
                {
                    return (T)proxy;
                }

                throw;
            }
        }

        private IDictionary<System.Type, object> Proxies { get; } = new Dictionary<System.Type, object>();

        TypeCode IConvertible.GetTypeCode()
        {
            return TypeCode.Object;
        }

        object IConvertible.ToType(System.Type conversionType, IFormatProvider? provider)
        {
            if (Proxies.ContainsKey(conversionType))
            {
                return Proxies[conversionType];
            }

            if (ToTypeCore(out var converted))
            {
                return Proxies[conversionType] = converted!;
            }

            throw new InvalidCastException($"Unable to cast {this.GetType().FullName} into {conversionType.FullName}");

            bool ToTypeCore(out object? result)
            {
                if (!conversionType.IsInstanceOfType(this)) return MakeProxy(conversionType, false, out result);

                result = this;
                return true;

            }
        }

        private bool MakeProxy(Type interfaceType, bool force, [NotNullWhen(true)] out object? result)
        {
            if (!interfaceType.IsInterface)
            {
                result = null;
                return false;
            }

            var interfaceAttribute = interfaceType.GetCustomAttribute<JsiiInterfaceAttribute>();
            if (interfaceAttribute == null)
            {
                // We can only convert to interfaces decorated with the JsiiInterfaceAttribute
                result = null;
                return false;
            }

            var types = ServiceContainer.ServiceProvider.GetRequiredService<ITypeCache>();

            if (!TryFindSupportedInterface(interfaceAttribute.FullyQualifiedName, Reference.Interfaces, types, out var adequateFqn))
            {
                // We can only convert to interfaces declared by this Reference
                result = null;
                return false;
            }

            var proxyType = types.GetProxyType(interfaceAttribute.FullyQualifiedName);
            var constructorInfo = proxyType.GetConstructor(
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
                null,
                new[] {typeof(ByRefValue)},
                null
            );
            if (constructorInfo == null)
            {
                throw new JsiiError($"Could not find constructor to instantiate {proxyType.FullName}");
            }

            result = constructorInfo.Invoke(new object[]{ Reference.ForProxy() });
            return true;

            bool TryFindSupportedInterface(string declaredFqn, string[] availableFqns, ITypeCache types, out string? foundFqn)
            {
                var declaredType = types.GetInterfaceType(declaredFqn);

                foreach (var candidate in availableFqns)
                {
                    var candidateType = types.GetInterfaceType(candidate);
                    if (!declaredType.IsAssignableFrom(candidateType)) continue;
                    foundFqn = candidate;
                    return true;
                }

                foundFqn = declaredFqn;
                return force;
            }
        }

        #region Impossible Conversions

        bool IConvertible.ToBoolean(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        byte IConvertible.ToByte(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        char IConvertible.ToChar(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        DateTime IConvertible.ToDateTime(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        decimal IConvertible.ToDecimal(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        double IConvertible.ToDouble(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        short IConvertible.ToInt16(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        int IConvertible.ToInt32(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        long IConvertible.ToInt64(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        sbyte IConvertible.ToSByte(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        float IConvertible.ToSingle(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        string IConvertible.ToString(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        ushort IConvertible.ToUInt16(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        uint IConvertible.ToUInt32(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        ulong IConvertible.ToUInt64(IFormatProvider? provider)
        {
            throw new InvalidCastException();
        }

        #endregion

        #endregion
    }
}
