using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.RuntimeTypeChecking), fullyQualifiedName: "jsii-calc.RuntimeTypeChecking")]
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
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithDefaultedArguments", parametersJson: "[{\"name\":\"arg1\",\"optional\":true,\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"optional\":true,\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
        public virtual void MethodWithDefaultedArguments(double? arg1 = null, string arg2 = null, System.DateTime? arg3 = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(double), typeof(string), typeof(System.DateTime)}, new object[]{arg1, arg2, arg3});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithOptionalAnyArgument", parametersJson: "[{\"name\":\"arg\",\"optional\":true,\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void MethodWithOptionalAnyArgument(object arg = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(object)}, new object[]{arg});
        }

        /// <summary>Used to verify verification of number of method arguments.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithOptionalArguments", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
        public virtual void MethodWithOptionalArguments(double arg1, string arg2, System.DateTime? arg3 = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(double), typeof(string), typeof(System.DateTime)}, new object[]{arg1, arg2, arg3});
        }
    }
}
