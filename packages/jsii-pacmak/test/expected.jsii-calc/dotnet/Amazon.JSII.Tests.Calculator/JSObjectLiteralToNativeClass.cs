using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiClass(typeof(JSObjectLiteralToNativeClass), "jsii-calc.JSObjectLiteralToNativeClass", "[]")]
    public class JSObjectLiteralToNativeClass : DeputyBase
    {
        public JSObjectLiteralToNativeClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected JSObjectLiteralToNativeClass(ByRefValue reference): base(reference)
        {
        }

        protected JSObjectLiteralToNativeClass(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("propA", "{\"primitive\":\"string\"}")]
        public virtual string PropA
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("propB", "{\"primitive\":\"number\"}")]
        public virtual double PropB
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }
    }
}