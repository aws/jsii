using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.JsonModel.Api.Response;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;

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
        public sealed class DeputyProps
        {
            public DeputyProps(object[] arguments = null)
            {
                Arguments = arguments ?? new object[] { };
            }

            public object[] Arguments { get; }
        }

        const BindingFlags StaticMemberFlags = BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic;
        const BindingFlags InstanceMemberFlags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;

        protected DeputyBase(DeputyProps props = null)
        {
            props = props ?? new DeputyProps();

            System.Type type = GetType();

            // If this is a native object, it won't have any jsii metadata.
            JsiiClassAttribute attribute = ReflectionUtils.GetClassAttribute(type);
            string fullyQualifiedName = attribute?.FullyQualifiedName ?? "Object";
            Parameter[] parameters = attribute?.Parameters ?? new Parameter[] { };

            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IClient client = serviceProvider.GetRequiredService<IClient>();
            CreateResponse response = client.Create(
                fullyQualifiedName,
                ConvertArguments(parameters, props.Arguments),
                GetOverrides()
            );

            Reference = new ByRefValue(response["$jsii.byref"] as string);
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            referenceMap.AddNativeReference(Reference, this, true);

            Override[] GetOverrides()
            {
                return GetMethodOverrides().Concat(GetPropertyOverrides()).ToArray();
            }

            IEnumerable<Override> GetMethodOverrides()
            {
                foreach (MethodInfo method in type.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic))
                {
                    JsiiMethodAttribute inheritedAttribute = method.GetCustomAttribute<JsiiMethodAttribute>(true);
                    JsiiMethodAttribute uninheritedAttribute = method.GetCustomAttribute<JsiiMethodAttribute>(false);

                    if ((inheritedAttribute != null && uninheritedAttribute == null) || uninheritedAttribute?.IsOverride == true)
                    {
                        yield return new Override(method: inheritedAttribute.Name);
                    }
                }
            }

            IEnumerable<Override> GetPropertyOverrides()
            {
                foreach (PropertyInfo property in type.GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic))
                {
                    JsiiPropertyAttribute inheritedAttribute = property.GetCustomAttribute<JsiiPropertyAttribute>(true);
                    JsiiPropertyAttribute uninheritedAttribute = property.GetCustomAttribute<JsiiPropertyAttribute>(false);

                    if ((inheritedAttribute != null && uninheritedAttribute == null) || uninheritedAttribute?.IsOverride == true)
                    {
                        yield return new Override(property: inheritedAttribute.Name);
                    }
                }
            }
        }

        protected DeputyBase(ByRefValue reference)
        {
            Reference = reference ?? throw new ArgumentNullException(nameof(reference));

            if (!(reference.IsProxy))
            {
                IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
                IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
                referenceMap.AddNativeReference(Reference, this);
            }
        }

        public ByRefValue Reference { get; }

        #region GetProperty

        protected static T GetStaticProperty<T>(System.Type type, [CallerMemberName] string propertyName = null)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            JsiiClassAttribute classAttribute = ReflectionUtils.GetClassAttribute(type);
            JsiiPropertyAttribute propertyAttribute = GetStaticPropertyAttribute(type, propertyName);

            return GetPropertyCore<T>(
                propertyAttribute,
                client => client.StaticGet(classAttribute.FullyQualifiedName, propertyAttribute.Name)
            );
        }

        protected T GetInstanceProperty<T>([CallerMemberName] string propertyName = null)
        {
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            JsiiPropertyAttribute propertyAttribute = GetInstancePropertyAttribute(propertyName);

            return GetPropertyCore<T>(
                propertyAttribute,
                client => client.Get(Reference.ToObjectReference(), propertyAttribute.Name)
            );
        }

        static T GetPropertyCore<T>(JsiiPropertyAttribute propertyAttribute, Func<IClient, GetResponse> getFunc)
        {
            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IClient client = serviceProvider.GetRequiredService<IClient>();

            GetResponse response = getFunc(client);

            IJsiiToFrameworkConverter converter = serviceProvider.GetRequiredService<IJsiiToFrameworkConverter>();
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            if (!converter.TryConvert(propertyAttribute, typeof(T), referenceMap, response.Value, out object frameworkValue))
            {
                throw new ArgumentException($"Could not convert value '{response.Value}' for property '{propertyAttribute.Name}'", nameof(getFunc));
            }

            return (T)frameworkValue;
        }

        #endregion

        #region SetProperty

        protected static void SetStaticProperty<T>(System.Type type, T value, [CallerMemberName] string propertyName = null)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            JsiiClassAttribute classAttribute = ReflectionUtils.GetClassAttribute(type);
            JsiiPropertyAttribute propertyAttribute = GetStaticPropertyAttribute(type, propertyName);

            SetPropertyCore(
                value,
                propertyAttribute,
                (client, jsiiValue) => client.StaticSet(classAttribute.FullyQualifiedName, propertyAttribute.Name, jsiiValue)
            );
        }

        protected void SetInstanceProperty<T>(T value, [CallerMemberName] string propertyName = null)
        {
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            JsiiPropertyAttribute propertyAttribute = GetInstancePropertyAttribute(propertyName);

            SetPropertyCore(
                value,
                propertyAttribute,
                (client, jsiiValue) => client.Set(Reference.ToObjectReference(), propertyAttribute.Name, jsiiValue)
            );
        }

        static void SetPropertyCore<T>(T value, JsiiPropertyAttribute propertyAttribute, Action<IClient, object> setAction)
        {
            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IFrameworkToJsiiConverter converter = serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            if (!converter.TryConvert(propertyAttribute, referenceMap, value, out object jsiiValue))
            {
                throw new ArgumentException($"Could not set property '{propertyAttribute.Name}' to '{value}'", nameof(value));
            }

            IClient client = serviceProvider.GetRequiredService<IClient>();
            setAction(client, jsiiValue);
        }

        #endregion

        #region InvokeMethod

        protected static void InvokeStaticVoidMethod(System.Type type, System.Type[] parameterTypes, object[] arguments, [CallerMemberName] string methodName = null)
        {
            InvokeStaticMethod<object>(type, parameterTypes, arguments, methodName);
        }

        protected void InvokeInstanceVoidMethod(System.Type[] parameterTypes, object[] arguments, [CallerMemberName] string methodName = null)
        {
            InvokeInstanceMethod<object>(parameterTypes, arguments, methodName);
        }

        protected static T InvokeStaticMethod<T>(System.Type type, System.Type[] parameterTypes, object[] arguments, [CallerMemberName] string methodName = null)
        {
            JsiiMethodAttribute methodAttribute = GetStaticMethodAttribute(type, methodName, parameterTypes);
            JsiiClassAttribute classAttribute = ReflectionUtils.GetClassAttribute(type);

            return InvokeMethodCore<T>(
                methodAttribute,
                arguments,
                (client, args) => throw new ArgumentException("Async static methods are not supported in JSII", nameof(methodAttribute)),
                (client, args) => client.StaticInvoke(
                    classAttribute.FullyQualifiedName,
                    methodAttribute.Name,
                    ConvertArguments(methodAttribute.Parameters, arguments)
                )
            );
        }

        protected T InvokeInstanceMethod<T>(System.Type[] parameterTypes, object[] arguments, [CallerMemberName] string methodName = null)
        {
            JsiiMethodAttribute methodAttribute = GetInstanceMethodAttribute(methodName, parameterTypes);

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

        static T InvokeMethodCore<T>(
            JsiiMethodAttribute methodAttribute,
            object[] arguments,
            Func<IClient, object[], BeginResponse> beginFunc,
            Func<IClient, object[], InvokeResponse> invokeFunc
        )
        {
            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IClient client = serviceProvider.GetRequiredService<IClient>();
            IJsiiToFrameworkConverter converter = serviceProvider.GetRequiredService<IJsiiToFrameworkConverter>();
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();

            object result = GetResult();
            if (!converter.TryConvert(methodAttribute.Returns, typeof(T), referenceMap, result, out object frameworkValue))
            {
                throw new ArgumentException($"Could not convert result '{result}' for method '{methodAttribute.Name}'", nameof(result));
            }
            
            return (T)frameworkValue;

            object GetResult()
            {
                object[] args = ConvertArguments(methodAttribute.Parameters, arguments);

                if (methodAttribute.IsAsync)
                {
                    BeginResponse beginResponse = beginFunc(client, args);

                    InvokeCallbacks();

                    return client.End(beginResponse.PromiseId).Result;
                }

                InvokeResponse invokeResponse = invokeFunc(client, args);

                return invokeResponse.Result;
            }
        }

        static void InvokeCallbacks()
        {
            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IClient client = serviceProvider.GetRequiredService<IClient>();
            IFrameworkToJsiiConverter converter = serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();

            CallbacksResponse callbacks = client.Callbacks();
            while (callbacks.Callbacks.Any())
            {
                foreach (Callback callback in callbacks.Callbacks)
                {
                    object result = callback.InvokeCallback(referenceMap, converter, out string error);

                    client.Complete(callback.CallbackId, error, result);
                }

                callbacks = client.Callbacks();
            }
        }

        #endregion

        #region ConvertArguments

        static object[] ConvertArguments(Parameter[] parameters, params object[] arguments)
        {
            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;

            if (parameters == null && arguments == null)
            {
                return new object[] { };
            }

            if (parameters == null || arguments == null || parameters.Length != arguments.Length)
            {
                throw new ArgumentException("Arguments do not match method parameters", nameof(arguments));
            }

            var cleanedArgs = new List<object>(arguments);
            var cleanedParams = new List<Parameter>(parameters);

            // Handling variadic parameters (null array, empty array, one value array, n values array..)
            if (parameters.Length > 0 && parameters.Last().IsVariadic)
            {
                // Last parameter is variadic, let's explode the .NET attributes
                Array variadicValues = arguments.Last() as Array;

                // We remove the last argument (the variadic array);
                cleanedArgs.RemoveAt(cleanedArgs.Count - 1);

                // A null value could be passed as a params
                if (variadicValues != null)
                {
                    // We save the last parameter to backfill the parameters list
                    var lastParameter = cleanedParams.Last();

                    for (int i = 0; i < variadicValues.Length; i++)
                    {
                        // Backfill the arguments
                        cleanedArgs.Add(variadicValues.GetValue(i));

                        // Backfill the parameters if necessary, for a 1:1 mirror with the cleanedArgs
                        if (cleanedArgs.Count != cleanedParams.Count)
                            cleanedParams.Add(lastParameter);
                    }
                }
            }

            IFrameworkToJsiiConverter converter = serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();

            return cleanedParams.Zip(cleanedArgs, (parameter, frameworkArgument) =>
            {
                if (!converter.TryConvert(parameter, referenceMap, frameworkArgument, out object jsiiArgument))
                {
                    throw new ArgumentException($"Could not convert argument '{frameworkArgument}' to Jsii", nameof(arguments));
                }

                return jsiiArgument;
            }).ToArray();
        }

        #endregion

        #region GetPropertyAttribute

        static JsiiPropertyAttribute GetStaticPropertyAttribute(System.Type type, string propertyName)
        {
            return GetPropertyAttributeCore(type, propertyName, StaticMemberFlags);
        }

        JsiiPropertyAttribute GetInstancePropertyAttribute(string propertyName)
        {
            return GetPropertyAttributeCore(GetType(), propertyName, InstanceMemberFlags);
        }

        static JsiiPropertyAttribute GetPropertyAttributeCore(System.Type type, string propertyName, BindingFlags bindingFlags)
        {
            type = type ?? throw new ArgumentNullException(nameof(type));
            propertyName = propertyName ?? throw new ArgumentNullException(nameof(propertyName));

            PropertyInfo propertyInfo = type.GetProperty(propertyName, bindingFlags);
            if (propertyInfo == null)
            {
                throw new ArgumentException($"Property {propertyName} does not exist", nameof(propertyName));
            }

            JsiiPropertyAttribute attribute = propertyInfo.GetCustomAttribute<JsiiPropertyAttribute>();
            if (attribute == null)
            {
                throw new ArgumentException($"Property {propertyName} is missing JsiiPropertyAttribute", nameof(propertyName));
            }

            return attribute;
        }

        #endregion

        #region GetMethodAttribute

        static JsiiMethodAttribute GetStaticMethodAttribute(System.Type type, string methodName, System.Type[] parameterTypes)
        {
            return GetMethodAttributeCore(type, methodName, parameterTypes, StaticMemberFlags);
        }

        JsiiMethodAttribute GetInstanceMethodAttribute(string methodName, System.Type[] parameterTypes)
        {
            return GetMethodAttributeCore(GetType(), methodName, parameterTypes, InstanceMemberFlags);
        }

        static JsiiMethodAttribute GetMethodAttributeCore(System.Type type, string methodName, System.Type[] parameterTypes, BindingFlags bindingFlags)
        {
            methodName = methodName ?? throw new ArgumentNullException(nameof(methodName));
            type = type ?? throw new ArgumentNullException(nameof(type));
            parameterTypes = parameterTypes ?? throw new ArgumentException(nameof(parameterTypes));

            MethodInfo methodInfo = type.GetMethod(methodName, bindingFlags, null, parameterTypes, new ParameterModifier[0]);
            if (methodInfo == null)
            {
                throw new ArgumentException($"Method {methodName} does not exist", nameof(methodName));
            }

            JsiiMethodAttribute methodAttribute = methodInfo.GetCustomAttribute<JsiiMethodAttribute>();
            if (methodAttribute == null)
            {
                throw new ArgumentException($"Method {methodName} is missing JsiiMethodAttribute", nameof(methodName));
            }

            return methodAttribute;
        }

        #endregion
        
        #region IConvertible
        
        private IDictionary<System.Type, object> Proxies { get; } = new Dictionary<System.Type, object>();
        
        public TypeCode GetTypeCode()
        {
            return TypeCode.Object;
        }
        
        public object ToType(System.Type conversionType, IFormatProvider provider)
        {
            if (Proxies.ContainsKey(conversionType))
            {
                return Proxies[conversionType];
            }
            
            if (ToTypeCore(out var converted))
            {
                Proxies[conversionType] = converted;
                return converted;
            }
            
            throw new InvalidCastException($"Unable to cast {this.GetType().FullName} into {conversionType.FullName}");
            
            bool ToTypeCore(out object result)
            {
                if (conversionType.IsInstanceOfType(this))
                {
                    result = this;
                    return true;
                }
                
                if (!conversionType.IsInterface || Reference.Interfaces.Length == 0)
                {
                    // We can only convert to interfaces that are declared on the Reference.
                    result = null;
                    return false;
                }

                var interfaceAttribute = conversionType.GetCustomAttribute<JsiiInterfaceAttribute>();
                if (interfaceAttribute == null)
                {
                    // We can only convert to interfaces decorated with the JsiiInterfaceAttribute
                    result = null;
                    return false;
                }

                if (!Reference.Interfaces.Contains(interfaceAttribute.FullyQualifiedName))
                {
                    // We can only convert to interfaces declared by this Reference
                    result = null;
                    return false;
                }

                var types = ServiceContainer.ServiceProvider.GetRequiredService<ITypeCache>();
                var proxyType = types.GetProxyType(interfaceAttribute.FullyQualifiedName);
                var constructorInfo = proxyType.GetConstructor(
                    BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
                    null,
                    new[] {typeof(ByRefValue)},
                    null
                );
                if (constructorInfo == null)
                {
                    throw new JsiiException($"Could not find constructor to instantiate {proxyType.FullName}");
                }

                result = constructorInfo.Invoke(new object[]{ Reference.ForProxy() });
                return true;
            }
        }

        #region Impossible Conversions
        
        public bool ToBoolean(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public byte ToByte(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }
        
        public char ToChar(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }
        
        public DateTime ToDateTime(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }
        
        public decimal ToDecimal(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public double ToDouble(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public short ToInt16(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public int ToInt32(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public long ToInt64(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public sbyte ToSByte(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public float ToSingle(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public string ToString(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public ushort ToUInt16(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public uint ToUInt32(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        public ulong ToUInt64(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        #endregion
        
        #endregion
    }
}
