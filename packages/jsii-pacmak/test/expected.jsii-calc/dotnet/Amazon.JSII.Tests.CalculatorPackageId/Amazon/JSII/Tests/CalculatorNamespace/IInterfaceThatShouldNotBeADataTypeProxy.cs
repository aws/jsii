using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.</summary>
    [JsiiTypeProxy(nativeType: typeof(IIInterfaceThatShouldNotBeADataType), fullyQualifiedName: "jsii-calc.IInterfaceThatShouldNotBeADataType")]
    internal sealed class IInterfaceThatShouldNotBeADataTypeProxy : DeputyBase, IIInterfaceThatShouldNotBeADataType
    {
        private IInterfaceThatShouldNotBeADataTypeProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "otherValue", typeJson: "{\"primitive\":\"string\"}")]
        public string OtherValue
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public string Value
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiMethod(name: "doThings")]
        public void DoThings()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}