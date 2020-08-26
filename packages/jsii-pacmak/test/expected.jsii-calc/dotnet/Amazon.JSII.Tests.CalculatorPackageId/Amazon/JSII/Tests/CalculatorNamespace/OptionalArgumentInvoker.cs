using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OptionalArgumentInvoker), fullyQualifiedName: "jsii-calc.OptionalArgumentInvoker", parametersJson: "[{\"name\":\"delegate\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithOptionalMethodArguments\"}}]")]
    public class OptionalArgumentInvoker : DeputyBase
    {
        public OptionalArgumentInvoker(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithOptionalMethodArguments @delegate): base(new DeputyProps(new object[]{@delegate}))
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

        [JsiiMethod(name: "invokeWithOptional")]
        public virtual void InvokeWithOptional()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        [JsiiMethod(name: "invokeWithoutOptional")]
        public virtual void InvokeWithoutOptional()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
