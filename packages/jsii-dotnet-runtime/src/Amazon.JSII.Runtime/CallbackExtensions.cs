using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.JsonModel.Api.Request;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Amazon.JSII.Runtime
{
    static class CallbackExtensions
    {
        public static object InvokeCallback(this Callback callback, IReferenceMap referenceMap, IFrameworkToJsiiConverter converter, out string error)
        {
            try
            {
                CallbackResult frameworkResult = callback.InvokeCallbackCore(referenceMap);

                converter.TryConvert(
                    frameworkResult,
                    referenceMap,
                    frameworkResult?.Value,
                    out object result
                );

                error = null;
                return result;
            }
            catch (TargetInvocationException e)
            {
                // An exception was thrown by the method being invoked
                error = e.InnerException.ToString();
                return null;
            }
            catch (Exception e)
            {
                // An exception was thrown while preparing the request or processing the result
                error = e.ToString();
                return null;
            }
        }

        static CallbackResult InvokeCallbackCore(this Callback callback, IReferenceMap referenceMap)
        {
            if (callback.Invoke != null)
            {
                return InvokeMethod(callback.Invoke, referenceMap);
            }

            if (callback.Get != null)
            {
                return InvokeGetter(callback.Get, referenceMap);
            }

            if (callback.Set != null)
            {
                InvokeSetter(callback.Set, referenceMap);
                return null;
            }

            throw new ArgumentException("Callback does not specificy a method, getter, or setter to invoke");
        }

        static CallbackResult InvokeMethod(InvokeRequest request, IReferenceMap referenceMap)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));
            DeputyBase deputy = referenceMap.GetOrCreateNativeReference(request.ObjectReference);

            MethodInfo methodInfo = ReflectionUtils.GetNativeMethod(deputy.GetType(), request.Method);

            if (methodInfo == null)
            {
                throw new InvalidOperationException($"Received callback for {deputy.GetType().Name}.{request.Method} method, but this method does not exist");
            }

            JsiiMethodAttribute attribute = methodInfo.GetCustomAttribute<JsiiMethodAttribute>();
            var returnValue = methodInfo.Invoke(deputy, request.Arguments.Select(arg => FromKernel(arg, referenceMap)).ToArray());
            return attribute?.Returns != null ? new CallbackResult(attribute?.Returns, returnValue) : null;
        }

        static CallbackResult InvokeGetter(GetRequest request, IReferenceMap referenceMap)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));
            DeputyBase deputy = referenceMap.GetOrCreateNativeReference(request.ObjectReference);

            PropertyInfo propertyInfo = ReflectionUtils.GetNativeProperty(deputy.GetType(), request.Property);
            if (propertyInfo == null)
            {
                throw new InvalidOperationException($"Received callback for {deputy.GetType().Name}.{request.Property} getter, but this property does not exist");
            }

            JsiiPropertyAttribute attribute = propertyInfo.GetCustomAttribute<JsiiPropertyAttribute>();

            MethodInfo methodInfo = propertyInfo.GetGetMethod();
            if (methodInfo == null)
            {
                throw new InvalidOperationException($"Received callback for {deputy.GetType().Name}.{request.Property} getter, but this property does not have a getter");
            }

            return new CallbackResult(attribute, methodInfo.Invoke(deputy, new object[] { }));
        }

        static void InvokeSetter(SetRequest request, IReferenceMap referenceMap)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));
            DeputyBase deputy = referenceMap.GetOrCreateNativeReference(request.ObjectReference);

            PropertyInfo propertyInfo = ReflectionUtils.GetNativeProperty(deputy.GetType(), request.Property);
            if (propertyInfo == null)
            {
                throw new InvalidOperationException($"Received callback for {deputy.GetType().Name}.{request.Property} setter, but this property does not exist");
            }

            MethodInfo methodInfo = propertyInfo.GetSetMethod();
            if (methodInfo == null)
            {
                throw new InvalidOperationException($"Received callback for {deputy.GetType().Name}.{request.Property} setter, but this property does not have a setter");
            }

            methodInfo.Invoke(deputy, new object[] { FromKernel(request.Value, referenceMap) });
        }

        /*
         * This is a temporary workaround / hack to solve an immediate problem, but does not completely solve the
         * problem to it's full extent. See https://github.com/aws/jsii/issues/404 for more information.
         */
        private static object FromKernel(object obj, IReferenceMap referenceMap)
        {
            if (obj is JObject)
            {
                var prop = ((JObject)obj).Property("$jsii.byref");
                if (prop != null)
                {
                    return referenceMap.GetOrCreateNativeReference(new ByRefValue(prop.Value.Value<String>()));
                }

                /*
                 * Turning all outstanding JObjects to IDictionary<string, object> (recursively), as the code generator
                 * will have emitted IDictionary<string, object> for  maps of string to <anything>. Not doing so would
                 * result in an ArgumentError for not being able to convert JObject to IDictionary.
                 */
                var dict = ((JObject)obj).ToObject<Dictionary<string, object>>();
                foreach (var key in dict.Keys)
                {
                    var value = dict[key];
                    if (value != null && value.GetType() == typeof(JObject))
                    {
                        dict[key] = FromKernel(value, referenceMap);
                    }
                }
                return dict;
            }
            return obj;
        }
    }

    internal class CallbackResult : OptionalValue
    {
        public CallbackResult(IOptionalValue optionalValue, object value)
            : this(optionalValue?.Type, optionalValue?.IsOptional ?? false, value) {}

        private CallbackResult(TypeReference type, bool isOptional, object value): base(type, isOptional)
        {
            Value = value;
        }

        public object Value { get; }
    }
}
