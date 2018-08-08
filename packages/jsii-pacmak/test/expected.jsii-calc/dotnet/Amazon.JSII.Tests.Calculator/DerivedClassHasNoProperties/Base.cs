using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.DerivedClassHasNoProperties
{
    [JsiiClass(typeof(Base), "jsii-calc.DerivedClassHasNoProperties.Base", "[]")]
    public class Base : DeputyBase
    {
        public Base(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Base(ByRefValue reference): base(reference)
        {
        }

        protected Base(DeputyProps props): base(props)
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