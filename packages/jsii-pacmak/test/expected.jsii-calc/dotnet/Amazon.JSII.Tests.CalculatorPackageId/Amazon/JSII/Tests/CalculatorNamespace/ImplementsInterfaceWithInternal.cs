using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ImplementsInterfaceWithInternal), fullyQualifiedName: "jsii-calc.ImplementsInterfaceWithInternal")]
    public class ImplementsInterfaceWithInternal : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithInternal
    {
        public ImplementsInterfaceWithInternal(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ImplementsInterfaceWithInternal(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ImplementsInterfaceWithInternal(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "visible", isOverride: true)]
        public virtual void Visible()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
