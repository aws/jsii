using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.JsonModel.Api.Request;
using Amazon.JSII.JsonModel.Spec;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Runtime.Services;
using Amazon.JSII.Runtime.Services.Converters;
using System;
using System.Reflection;

namespace Amazon.JSII.Runtime
{
    static class CallbackExtensions
    {
        public static object InvokeCallback(this Callback callback, IReferenceMap referenceMap, IFrameworkToJsiiConverter converter, out string error)
        {
            try
            {
                TypeReference returnType;
                object frameworkResult = callback.InvokeCallbackCore(referenceMap, out returnType);

                converter.TryConvert(
                    returnType ?? new TypeReference(primitive: PrimitiveType.Any),
                    referenceMap,
                    frameworkResult,
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

        static object InvokeCallbackCore(this Callback callback, IReferenceMap referenceMap, out TypeReference returnType)
        {
            if (callback.Invoke != null)
            {
                return InvokeMethod(callback.Invoke, referenceMap, out returnType);
            }

            if (callback.Get != null)
            {
                return InvokeGetter(callback.Get, referenceMap, out returnType);
            }

            if (callback.Set != null)
            {
                InvokeSetter(callback.Set, referenceMap);
                returnType = null;
                return null;
            }

            throw new ArgumentException("Callback does not specificy a method, getter, or setter to invoke");
        }

        static object InvokeMethod(InvokeRequest request, IReferenceMap referenceMap, out TypeReference returnType)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));
            DeputyBase deputy = referenceMap.GetOrCreateNativeReference(request.ObjectReference);

            MethodInfo methodInfo = ReflectionUtils.GetNativeMethod(deputy.GetType(), request.Method);

            if (methodInfo == null)
            {
                throw new InvalidOperationException($"Received callback for {deputy.GetType().Name}.{request.Method} getter, but this method does not exist");
            }

            JsiiMethodAttribute attribute = methodInfo.GetCustomAttribute<JsiiMethodAttribute>();
            returnType = attribute?.Returns;

            return methodInfo.Invoke(deputy, request.Arguments);
        }

        static object InvokeGetter(GetRequest request, IReferenceMap referenceMap, out TypeReference returnType)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));
            DeputyBase deputy = referenceMap.GetOrCreateNativeReference(request.ObjectReference);

            PropertyInfo propertyInfo = ReflectionUtils.GetNativeProperty(deputy.GetType(), request.Property);
            if (propertyInfo == null)
            {
                throw new InvalidOperationException($"Received callback for {deputy.GetType().Name}.{request.Property} getter, but this property does not exist");
            }

            JsiiPropertyAttribute attribute = propertyInfo.GetCustomAttribute<JsiiPropertyAttribute>();
            returnType = attribute?.Type;

            MethodInfo methodInfo = propertyInfo.GetGetMethod();
            if (methodInfo == null)
            {
                throw new InvalidOperationException($"Received callback for {deputy.GetType().Name}.{request.Property} getter, but this property does not have a getter");
            }

            return methodInfo.Invoke(deputy, new object[] { });
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

            methodInfo.Invoke(deputy, new object[] { request.Value });
        }
    }
}
