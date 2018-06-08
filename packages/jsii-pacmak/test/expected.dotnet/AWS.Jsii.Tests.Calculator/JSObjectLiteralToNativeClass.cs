using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.JSObjectLiteralToNativeClass", "[]")]
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
            get => GetProperty<string>();
            set => SetProperty(value);
        }

        [JsiiProperty("propB", "{\"primitive\":\"number\"}")]
        public virtual double PropB
        {
            get => GetProperty<double>();
            set => SetProperty(value);
        }
    }
}