using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(JSObjectLiteralToNativeClass), fullyQualifiedName: "jsii-calc.JSObjectLiteralToNativeClass")]
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

        [JsiiProperty(name: "propA", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string PropA
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "propB", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double PropB
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }
    }
}