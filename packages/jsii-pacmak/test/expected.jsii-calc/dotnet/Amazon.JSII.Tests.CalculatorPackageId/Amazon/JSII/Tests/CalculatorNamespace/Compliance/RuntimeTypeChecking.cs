using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.RuntimeTypeChecking), fullyQualifiedName: "jsii-calc.compliance.RuntimeTypeChecking")]
    public class RuntimeTypeChecking : DeputyBase
    {
        public RuntimeTypeChecking(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected RuntimeTypeChecking(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected RuntimeTypeChecking(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithDefaultedArguments", parametersJson: "[{\"name\":\"arg1\",\"optional\":true,\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"optional\":true,\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
        public virtual void MethodWithDefaultedArguments(double? arg1 = null, string? arg2 = null, System.DateTime? arg3 = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(double), typeof(string), typeof(System.DateTime)}, new object?[]{arg1, arg2, arg3});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithOptionalAnyArgument", parametersJson: "[{\"name\":\"arg\",\"optional\":true,\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void MethodWithOptionalAnyArgument(object? arg = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(object)}, new object?[]{arg});
        }

        /// <summary>Used to verify verification of number of method arguments.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "methodWithOptionalArguments", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
        public virtual void MethodWithOptionalArguments(double arg1, string arg2, System.DateTime? arg3 = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(double), typeof(string), typeof(System.DateTime)}, new object?[]{arg1, arg2, arg3});
        }
    }
}
