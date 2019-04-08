using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(StripInternal), "jsii-calc.StripInternal", "[]")]
    public class StripInternal : DeputyBase
    {
        public StripInternal(): base(new DeputyProps(new object[]{}))
        {
        }

        protected StripInternal(ByRefValue reference): base(reference)
        {
        }

        protected StripInternal(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("youSeeMe", "{\"primitive\":\"string\"}")]
        public virtual string YouSeeMe
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}