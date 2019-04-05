using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
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

        [JsiiProperty("propA", "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string PropA
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("propB", "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double PropB
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }
    }
}