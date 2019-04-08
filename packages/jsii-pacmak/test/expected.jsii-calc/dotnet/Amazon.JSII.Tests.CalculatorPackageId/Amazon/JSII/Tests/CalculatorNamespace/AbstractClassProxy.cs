using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(AbstractClass), "jsii-calc.AbstractClass")]
    internal sealed class AbstractClassProxy : AbstractClass
    {
        private AbstractClassProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("abstractProperty", "{\"primitive\":\"string\"}")]
        public override string AbstractProperty
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiMethod("abstractMethod", "{\"primitive\":\"string\"}", "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public override string AbstractMethod(string name)
        {
            return InvokeInstanceMethod<string>(new object[]{name});
        }
    }
}