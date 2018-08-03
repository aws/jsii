using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.JsonModel.Api.Response;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace Amazon.JSII.Runtime.Deputy
{
    public abstract class DeputyBase
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

            Reference = new ByRefValue(response["$jsii.byref"]);
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            referenceMap.AddNativeReference(Reference, this);

            Override[] GetOverrides()
            {
                return GetMethodOverrides().Concat(GetPropertyOverrides()).ToArray();
            }

            IEnumerable<Override> GetMethodOverrides()
            {
                foreach (MethodInfo method in type.GetMethods())
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
                foreach (PropertyInfo property in type.GetProperties())
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

            IServiceProvider serviceProvider = ServiceContainer.ServiceProvider;
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();
            referenceMap.AddNativeReference(Reference, this);
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
            if (!converter.TryConvert(propertyAttribute.Type, referenceMap, response.Value, out object frameworkValue))
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
            if (!converter.TryConvert(propertyAttribute.Type, referenceMap, value, out object jsiiValue))
            {
                throw new ArgumentException($"Could not set property '{propertyAttribute.Name}' to '{value}'", nameof(value));
            }

            IClient client = serviceProvider.GetRequiredService<IClient>();
            setAction(client, jsiiValue);
        }

        #endregion

        #region InvokeMethod

        protected static void InvokeStaticVoidMethod(System.Type type, object[] arguments, [CallerMemberName] string methodName = null)
        {
            InvokeStaticMethod<object>(type, arguments, methodName);
        }

        protected void InvokeInstanceVoidMethod(object[] arguments, [CallerMemberName] string methodName = null)
        {
            InvokeInstanceMethod<object>(arguments, methodName);
        }

        protected static T InvokeStaticMethod<T>(System.Type type, object[] arguments, [CallerMemberName] string methodName = null)
        {
            JsiiMethodAttribute methodAttribute = GetStaticMethodAttribute(type, methodName);
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

        protected T InvokeInstanceMethod<T>(object[] arguments, [CallerMemberName] string methodName = null)
        {
            JsiiMethodAttribute methodAttribute = GetInstanceMethodAttribute(methodName);

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
            IClient client = serviceProvider.GetRequiredService<IClient>(); ;
            IJsiiToFrameworkConverter converter = serviceProvider.GetRequiredService<IJsiiToFrameworkConverter>();
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();

            object result = GetResult();
            if (!converter.TryConvert(methodAttribute.Returns, referenceMap, result, out object frameworkValue))
            {
                throw new ArgumentException($"Could not convert result '{result}' for method '{methodAttribute.Name}'", nameof(result));
            }

            return (T)frameworkValue;

            object GetResult()
            {
                object[] args = ConvertArguments(methodAttribute.Parameters, arguments);

                if (methodAttribute.Returns?.IsPromise == true)
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

            IFrameworkToJsiiConverter converter = serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            IReferenceMap referenceMap = serviceProvider.GetRequiredService<IReferenceMap>();

            return parameters.Zip(arguments, (parameter, frameworkArgument) =>
            {
                if (!converter.TryConvert(parameter.Type, referenceMap, frameworkArgument, out object jsiiArgument))
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

        static JsiiMethodAttribute GetStaticMethodAttribute(System.Type type, string methodName)
        {
            return GetMethodAttributeCore(type, methodName, StaticMemberFlags);
        }

        JsiiMethodAttribute GetInstanceMethodAttribute(string methodName)
        {
            return GetMethodAttributeCore(GetType(), methodName, InstanceMemberFlags);
        }

        static JsiiMethodAttribute GetMethodAttributeCore(System.Type type, string methodName, BindingFlags bindingFlags)
        {
            methodName = methodName ?? throw new ArgumentNullException(nameof(methodName));
            type = type ?? throw new ArgumentNullException(nameof(type));

            MethodInfo methodInfo = type.GetMethod(methodName, bindingFlags);
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
    }
}
