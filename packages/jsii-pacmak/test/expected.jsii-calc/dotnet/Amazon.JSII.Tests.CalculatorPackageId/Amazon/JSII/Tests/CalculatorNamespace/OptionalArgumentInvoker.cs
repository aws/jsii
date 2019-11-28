using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OptionalArgumentInvoker), fullyQualifiedName: "jsii-calc.OptionalArgumentInvoker", parametersJson: "[{\"name\":\"delegate\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithOptionalMethodArguments\"}}]")]
    public class OptionalArgumentInvoker : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public OptionalArgumentInvoker(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithOptionalMethodArguments @delegate): base(new DeputyProps(new object[]{@delegate}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OptionalArgumentInvoker(ByRefValue reference): base(reference)
        {
        }

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
