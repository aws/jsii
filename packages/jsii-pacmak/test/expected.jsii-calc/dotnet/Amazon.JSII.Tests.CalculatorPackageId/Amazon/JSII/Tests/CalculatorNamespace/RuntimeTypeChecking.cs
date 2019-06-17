using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(RuntimeTypeChecking), fullyQualifiedName: "jsii-calc.RuntimeTypeChecking")]
    public class RuntimeTypeChecking : DeputyBase
    {
        public RuntimeTypeChecking(): base(new DeputyProps(new object[]{}))
        {
        }

        protected RuntimeTypeChecking(ByRefValue reference): base(reference)
        {
        }

        protected RuntimeTypeChecking(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithDefaultedArguments", parametersJson: "[{\"name\":\"arg1\",\"optional\":true,\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"optional\":true,\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
        public virtual void MethodWithDefaultedArguments(double? arg1, string arg2, System.DateTime? arg3)
        {
            InvokeInstanceVoidMethod(new object[]{arg1, arg2, arg3});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithOptionalAnyArgument", parametersJson: "[{\"name\":\"arg\",\"optional\":true,\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void MethodWithOptionalAnyArgument(object arg)
        {
            InvokeInstanceVoidMethod(new object[]{arg});
        }

        /// <summary>Used to verify verification of number of method arguments.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithOptionalArguments", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
        public virtual void MethodWithOptionalArguments(double arg1, string arg2, System.DateTime? arg3)
        {
            InvokeInstanceVoidMethod(new object[]{arg1, arg2, arg3});
        }
    }
}
