using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(AbstractClassBase), "jsii-calc.AbstractClassBase")]
    internal sealed class AbstractClassBaseProxy : AbstractClassBase
    {
        private AbstractClassBaseProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("abstractProperty", "{\"primitive\":\"string\"}")]
        public override string AbstractProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}