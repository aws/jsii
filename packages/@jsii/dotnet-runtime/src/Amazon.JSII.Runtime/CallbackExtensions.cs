using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.JsonModel.Api.Request;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Amazon.JSII.Runtime
{
    internal static class CallbackExtensions
    {
        public static object? InvokeCallback(this Callback callback, IReferenceMap referenceMap,
            IFrameworkToJsiiConverter converter, out Exception? error)
        {
            try
            {
                CallbackResult? frameworkResult = callback.InvokeCallbackCore(referenceMap);

                converter.TryConvert(
                    frameworkResult,
                    referenceMap,
                    frameworkResult?.Value,
                    out object? result
                );

                error = null;
                return result;
            }
            catch (TargetInvocationException e)
            {
                // An exception was thrown by the method being invoked
                error = e.InnerException;
                return null;
            }
            catch (Exception e)
            {
                // An exception was thrown while preparing the request or processing the result
                error = e;
                return null;
            }
        }

        static CallbackResult? InvokeCallbackCore(this Callback callback, IReferenceMap referenceMap)
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

        private static CallbackResult? InvokeMethod(InvokeRequest request, IReferenceMap referenceMap)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));
            var deputy = referenceMap.GetOrCreateNativeReference(request.ObjectReference);

            var methodInfo = ReflectionUtils.GetNativeMethod(deputy.GetType(), request.Method);

            if (methodInfo == null)
            {
                throw new InvalidOperationException(
                    $"Received callback for {deputy.GetType().Name}.{request.Method} method, but this method does not exist");
            }

            var attribute = methodInfo.GetAttribute<JsiiMethodAttribute>()!;
            var parameters = methodInfo.GetParameters();

            var converter = ServiceContainer.ServiceProvider.GetRequiredService<IJsiiToFrameworkConverter>();

            var rehydratedArgs = Enumerable.Range(0, request.Arguments?.Length ?? 0)
                .Select(n =>
                {
                    var paramIndex = n >= parameters.Length ? parameters.Length - 1 : n;
                    var requiredType = parameters[paramIndex].ParameterType;
                    if (!converter.TryConvert(attribute.Parameters[paramIndex], requiredType, referenceMap,
                        request.Arguments![n], out var value))
                    {
                        throw new JsiiError($"Unable to convert {request.Arguments![n]} to {requiredType.Name}");
                    }

                    if (attribute.Parameters[paramIndex].IsVariadic)
                    {
                        var array = Array.CreateInstance(value?.GetType() ?? requiredType, 1);
                        array.SetValue(value, 0);
                        value = array;
                    }

                    if (!requiredType.IsInstanceOfType(value) && value is IConvertible)
                    {
                        value = Convert.ChangeType(value, requiredType, CultureInfo.InvariantCulture);
                    }

                    return value;
                }).ToArray();

            var invokeParameters = Enumerable.Range(0, parameters.Length)
                .Select(n =>
                {
                    if (n >= rehydratedArgs.Length)
                    {
                        return null;
                    }

                    if (n == parameters.Length - 1 && rehydratedArgs.Length > parameters.Length)
                    {
                        var allArgs = rehydratedArgs.TakeLast(rehydratedArgs.Length - parameters.Length + 1);
                        var array = Array.CreateInstance(
                            parameters[parameters.Length - 1].ParameterType.GetElementType()!,
                            allArgs.Select(list => (list as Array)!.Length).Sum());
                        var idx = 0;
                        foreach (var list in allArgs)
                        {
                            foreach (var item in (list as Array)!)
                            {
                                array.SetValue(item, idx);
                                idx += 1;
                            }
                        }

                        return array;
                    }

                    return rehydratedArgs[n];
                }).ToArray();

            var returnValue = methodInfo.Invoke(deputy, invokeParameters);
            return attribute?.Returns != null ? new CallbackResult(attribute.Returns, returnValue) : null;
        }

        private static CallbackResult InvokeGetter(GetRequest request, IReferenceMap referenceMap)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));
            var deputy = referenceMap.GetOrCreateNativeReference(request.ObjectReference);

            var propertyInfo = ReflectionUtils.GetNativeProperty(deputy.GetType(), request.Property);
            if (propertyInfo == null)
            {
                throw new InvalidOperationException(
                    $"Received callback for {deputy.GetType().Name}.{request.Property} getter, but this property does not exist");
            }

            var attribute = propertyInfo.GetAttribute<JsiiPropertyAttribute>()!;

            var methodInfo = propertyInfo.GetMethod;
            if (methodInfo == null)
            {
                throw new InvalidOperationException(
                    $"Received callback for {deputy.GetType().Name}.{request.Property} getter, but this property does not have a getter");
            }

            return new CallbackResult(attribute, methodInfo.Invoke(deputy, Array.Empty<object>()));
        }

        private static void InvokeSetter(SetRequest request, IReferenceMap referenceMap)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));
            var deputy = referenceMap.GetOrCreateNativeReference(request.ObjectReference);

            var propertyInfo = ReflectionUtils.GetNativeProperty(deputy.GetType(), request.Property);
            if (propertyInfo == null)
            {
                throw new InvalidOperationException(
                    $"Received callback for {deputy.GetType().Name}.{request.Property} setter, but this property does not exist");
            }

            var methodInfo = propertyInfo.SetMethod;
            if (methodInfo == null)
            {
                throw new InvalidOperationException(
                    $"Received callback for {deputy.GetType().Name}.{request.Property} setter, but this property does not have a setter");
            }

            methodInfo.Invoke(deputy, new[] {FromKernel(request.Value, referenceMap)});
        }

        /*
         * This is a temporary workaround / hack to solve an immediate problem, but does not completely solve the
         * problem to it's full extent. See https://github.com/aws/jsii/issues/404 for more information.
         */
        private static object? FromKernel(object? obj, IReferenceMap referenceMap)
        {
            if (!(obj is JObject jObject)) return obj;
            var prop = jObject.Property("$jsii.byref", StringComparison.InvariantCulture);
            if (prop != null)
            {
                var objId = prop.Value.Value<String>()!;
                string[]? interfaces = jObject.Property("$jsii.interfaces", StringComparison.InvariantCulture)?.Value
                    ?.Values<string>()?.ToArray()!;
                return referenceMap.GetOrCreateNativeReference(new ByRefValue(objId, interfaces));
            }

            if (jObject.ContainsKey("$jsii.map"))
            {
                jObject = (JObject) jObject.Property("$jsii.map", StringComparison.InvariantCulture)!.Value;
            }

            /*
             * Turning all outstanding JObjects to IDictionary<string, object> (recursively), as the code generator
             * will have emitted IDictionary<string, object> for  maps of string to <anything>. Not doing so would
             * result in an ArgumentError for not being able to convert JObject to IDictionary.
             */
            var dict = jObject.ToObject<Dictionary<string, object?>>()!;
            var mapped = new Dictionary<string, object?>(dict.Count);
            foreach (var key in dict.Keys)
            {
                var value = dict[key];
                if (value != null && value.GetType() == typeof(JObject))
                {
                    mapped[key] = FromKernel(value, referenceMap);
                }
                else
                {
                    mapped[key] = value;
                }
            }

            return mapped;
        }
    }

    internal sealed class CallbackResult : OptionalValue
    {
        public CallbackResult(IOptionalValue optionalValue, object? value)
            : this(optionalValue.Type, optionalValue.IsOptional, value)
        {
        }

        private CallbackResult(TypeReference type, bool isOptional, object? value) : base(type, isOptional)
        {
            Value = value;
        }

        public object? Value { get; }
    }
}