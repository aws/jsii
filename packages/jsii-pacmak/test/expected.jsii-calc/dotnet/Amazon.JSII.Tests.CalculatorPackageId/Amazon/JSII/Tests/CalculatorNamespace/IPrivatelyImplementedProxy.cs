using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIPrivatelyImplemented), "jsii-calc.IPrivatelyImplemented")]
    internal sealed class IPrivatelyImplementedProxy : DeputyBase, IIPrivatelyImplemented
    {
        private IPrivatelyImplementedProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}