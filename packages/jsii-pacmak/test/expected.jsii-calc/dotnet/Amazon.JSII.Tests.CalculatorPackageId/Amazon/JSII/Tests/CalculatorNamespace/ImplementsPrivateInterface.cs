using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ImplementsPrivateInterface), "jsii-calc.ImplementsPrivateInterface", "[]")]
    public class ImplementsPrivateInterface : DeputyBase
    {
        public ImplementsPrivateInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ImplementsPrivateInterface(ByRefValue reference): base(reference)
        {
        }

        protected ImplementsPrivateInterface(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("private", "{\"primitive\":\"string\"}")]
        public virtual string Private
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}