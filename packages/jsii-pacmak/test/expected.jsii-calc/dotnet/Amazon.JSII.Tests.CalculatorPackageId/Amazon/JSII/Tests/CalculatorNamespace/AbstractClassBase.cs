using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(AbstractClassBase), "jsii-calc.AbstractClassBase", "[]")]
    public abstract class AbstractClassBase : DeputyBase
    {
        protected AbstractClassBase(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AbstractClassBase(ByRefValue reference): base(reference)
        {
        }

        protected AbstractClassBase(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("abstractProperty", "{\"primitive\":\"string\"}")]
        public virtual string AbstractProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}