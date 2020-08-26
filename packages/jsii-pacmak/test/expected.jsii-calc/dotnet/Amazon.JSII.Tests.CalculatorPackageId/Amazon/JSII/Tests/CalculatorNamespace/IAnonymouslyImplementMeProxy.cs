using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IAnonymouslyImplementMe), fullyQualifiedName: "jsii-calc.IAnonymouslyImplementMe")]
    internal sealed class IAnonymouslyImplementMeProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe
    {
        private IAnonymouslyImplementMeProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public double Value
        {
            get => GetInstanceProperty<double>();
        }

        [JsiiMethod(name: "verb", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Verb()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
