using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(ImplementInternalInterface), fullyQualifiedName: "jsii-calc.ImplementInternalInterface")]
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

        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Prop
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}