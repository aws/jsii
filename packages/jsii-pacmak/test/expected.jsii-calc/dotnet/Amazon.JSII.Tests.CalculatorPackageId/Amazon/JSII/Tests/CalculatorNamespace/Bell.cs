using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Bell), fullyQualifiedName: "jsii-calc.Bell")]
    public class Bell : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IBell
    {
        public Bell(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Bell(ByRefValue reference): base(reference)
        {
        }

        protected Bell(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "ring", isOverride: true)]
        public virtual void Ring()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "rung", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool Rung
        {
            get => GetInstanceProperty<bool>();
            set => SetInstanceProperty(value);
        }
    }
}
