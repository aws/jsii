using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OptionalArgumentInvoker), fullyQualifiedName: "jsii-calc.OptionalArgumentInvoker", parametersJson: "[{\"name\":\"delegate\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithOptionalMethodArguments\"}}]")]
    public class OptionalArgumentInvoker : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public OptionalArgumentInvoker(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithOptionalMethodArguments @delegate): base(new DeputyProps(new object[]{@delegate}))
        {
        }

        protected OptionalArgumentInvoker(ByRefValue reference): base(reference)
        {
        }

        protected OptionalArgumentInvoker(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "invokeWithOptional")]
        public virtual void InvokeWithOptional()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "invokeWithoutOptional")]
        public virtual void InvokeWithoutOptional()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
