using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ImplementInternalInterface), "jsii-calc.ImplementInternalInterface", "[]")]
    public class ImplementInternalInterface : DeputyBase
    {
        public ImplementInternalInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ImplementInternalInterface(ByRefValue reference): base(reference)
        {
        }

        protected ImplementInternalInterface(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("prop", "{\"primitive\":\"string\"}")]
        public virtual string Prop
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}