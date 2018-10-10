using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IMutableObjectLiteral), "jsii-calc.MutableObjectLiteral")]
    internal sealed class MutableObjectLiteralProxy : DeputyBase, IMutableObjectLiteral
    {
        private MutableObjectLiteralProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("value", "{\"primitive\":\"string\"}")]
        public string Value
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}