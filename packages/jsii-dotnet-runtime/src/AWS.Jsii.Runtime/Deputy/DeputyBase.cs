using AWS.Jsii.JsonModel.Api;
using AWS.Jsii.JsonModel.Api.Response;
using AWS.Jsii.JsonModel.Spec;
using AWS.Jsii.Runtime.Services;
using AWS.Jsii.Runtime.Services.Converters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace AWS.Jsii.Runtime.Deputy
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

        const BindingFlags MemberFlags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;

        readonly IServiceProvider _serviceProvider;

        protected DeputyBase(DeputyProps props = null)
        {
            props = props ?? new DeputyProps();

            _serviceProvider = ServiceContainer.ServiceProvider;
            
            System.Type type = GetType();

            // If this is a native object, it won't have any jsii metadata.
            JsiiClassAttribute attribute = ReflectionUtils.GetClassAttribute(type);
            string fullyQualifiedName = attribute?.FullyQualifiedName ?? "Object";
            Parameter[] parameters = attribute?.Parameters ?? new Parameter[] { };

            IClient client = _serviceProvider.GetRequiredService<IClient>();
            CreateResponse response = client.Create(
                fullyQualifiedName,
                ConvertArguments(parameters, props.Arguments),
                GetOverrides()
            );

            Reference = new ByRefValue(response["$jsii.byref"]);
            IReferenceMap referenceMap = _serviceProvider.GetRequiredService<IReferenceMap>();
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

            _serviceProvider = ServiceContainer.ServiceProvider;
            IReferenceMap referenceMap = _serviceProvider.GetRequiredService<IReferenceMap>();
            referenceMap.AddNativeReference(Reference, this);
        }

        public ByRefValue Reference { get; }

        protected T GetProperty<T>([CallerMemberName] string callerMemberName = null)
        {
            JsiiPropertyAttribute attribute = GetPropertyAttribute(callerMemberName);

            IClient client = _serviceProvider.GetRequiredService<IClient>();
            GetResponse response = client.Get(Reference.ToObjectReference(), attribute.Name);
            object value = response.Value;

            IJsiiToFrameworkConverter converter = _serviceProvider.GetRequiredService<IJsiiToFrameworkConverter>();
            IReferenceMap referenceMap = _serviceProvider.GetRequiredService<IReferenceMap>();
            if (!converter.TryConvert(attribute.Type, referenceMap, value, out object frameworkValue))
            {
                throw new ArgumentException($"Could not convert value '{value}' for property '{callerMemberName}'", nameof(value));
            }

            return (T)frameworkValue;
        }

        protected void SetProperty<T>(T value, [CallerMemberName] string callerMemberName = null)
        {
            JsiiPropertyAttribute attribute = GetPropertyAttribute(callerMemberName);

            IFrameworkToJsiiConverter converter = _serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            IReferenceMap referenceMap = _serviceProvider.GetRequiredService<IReferenceMap>();
            if (!converter.TryConvert(attribute.Type, referenceMap, value, out object jsiiValue))
            {
                throw new ArgumentException($"Could not set property '{callerMemberName}' to '{value}'", nameof(value));
            }

            IClient client = _serviceProvider.GetRequiredService<IClient>();
            client.Set(Reference.ToObjectReference(), attribute.Name, jsiiValue);
        }

        protected void InvokeVoidMethod(object[] arguments, [CallerMemberName] string callerMemberName = null)
        {
            InvokeMethod<object>(arguments, callerMemberName);
        }

        protected T InvokeMethod<T>(object[] arguments, [CallerMemberName] string callerMemberName = null)
        {
            JsiiMethodAttribute attribute = GetMethodAttribute(callerMemberName);

            IClient client = _serviceProvider.GetRequiredService<IClient>();;
            IJsiiToFrameworkConverter converter = _serviceProvider.GetRequiredService<IJsiiToFrameworkConverter>();
            IReferenceMap referenceMap = _serviceProvider.GetRequiredService<IReferenceMap>();

            object result = GetResult();
            if (!converter.TryConvert(attribute.Returns, referenceMap, result, out object frameworkValue))
            {
                throw new ArgumentException($"Could not convert result '{result}' for method '{callerMemberName}'", nameof(result));
            }

            return (T)frameworkValue;

            object GetResult()
            {
                if (attribute.Returns?.IsPromise == true)
                {
                    BeginResponse beginResponse = client.Begin
                    (
                        Reference.ToObjectReference(),
                        attribute.Name,
                        ConvertArguments(attribute.Parameters, arguments)
                    );

                    InvokeCallbacks(client, referenceMap);

                    return client.End(beginResponse.PromiseId).Result;
                }

                InvokeResponse response = client.Invoke
                (
                    Reference.ToObjectReference(),
                    attribute.Name,
                    ConvertArguments(attribute.Parameters, arguments)
                );

                return response.Result;
            }
        }

        void InvokeCallbacks(IClient client, IReferenceMap referenceMap)
        {
            CallbacksResponse callbacks = client.Callbacks();
            while (callbacks.Callbacks.Any())
            {
                foreach (Callback callback in callbacks.Callbacks)
                {
                    IFrameworkToJsiiConverter converter = _serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();

                    object result = callback.InvokeCallback(referenceMap, converter, out string error);

                    client.Complete(callback.CallbackId, error, result);
                }

                callbacks = client.Callbacks();
            }
        }

        object[] ConvertArguments(Parameter[] parameters, params object[] arguments)
        {
            if (parameters == null && arguments == null)
            {
                return new object[] { };
            }

            if (parameters == null || arguments == null || parameters.Length != arguments.Length)
            {
                throw new ArgumentException("Arguments do not match method parameters", nameof(arguments));
            }

            IFrameworkToJsiiConverter converter = _serviceProvider.GetRequiredService<IFrameworkToJsiiConverter>();
            IReferenceMap referenceMap = _serviceProvider.GetRequiredService<IReferenceMap>();

            return parameters.Zip(arguments, (parameter, frameworkArgument) =>
            {
                if (!converter.TryConvert(parameter.Type, referenceMap, frameworkArgument, out object jsiiArgument))
                {
                    throw new ArgumentException($"Could not convert argument '{frameworkArgument}' to Jsii", nameof(arguments));
                }

                return jsiiArgument;
            }).ToArray();
        }

        JsiiPropertyAttribute GetPropertyAttribute(string propertyName)
        {
            if (propertyName == null)
            {
                throw new ArgumentNullException(nameof(propertyName));
            }

            System.Type type = GetType();

            PropertyInfo propertyInfo = type.GetProperty(propertyName, MemberFlags);
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

        JsiiMethodAttribute GetMethodAttribute(string methodName)
        {
            if (methodName == null)
            {
                throw new ArgumentNullException(nameof(methodName));
            }

            System.Type type = GetType();

            MethodInfo methodInfo = type.GetMethod(methodName, MemberFlags);
            if (methodInfo == null)
            {
                throw new ArgumentException($"Method {methodName} does not exist", nameof(methodName));
            }

            JsiiMethodAttribute attribute = methodInfo.GetCustomAttribute<JsiiMethodAttribute>();
            if (attribute == null)
            {
                throw new ArgumentException($"Method {methodName} is missing JsiiMethodAttribute", nameof(methodName));
            }

            return attribute;
        }
    }
}
