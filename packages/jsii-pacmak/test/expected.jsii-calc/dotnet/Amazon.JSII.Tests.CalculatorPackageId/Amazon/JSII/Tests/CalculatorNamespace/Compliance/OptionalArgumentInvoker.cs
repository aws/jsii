using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.OptionalArgumentInvoker), fullyQualifiedName: "jsii-calc.compliance.OptionalArgumentInvoker", parametersJson: "[{\"name\":\"delegate\",\"type\":{\"fqn\":\"jsii-calc.compliance.IInterfaceWithOptionalMethodArguments\"}}]")]
    public class OptionalArgumentInvoker : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public OptionalArgumentInvoker(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IInterfaceWithOptionalMethodArguments @delegate): base(new DeputyProps(new object[]{@delegate}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OptionalArgumentInvoker(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OptionalArgumentInvoker(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "invokeWithOptional")]
        public virtual void InvokeWithOptional()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "invokeWithoutOptional")]
        public virtual void InvokeWithoutOptional()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
