using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IInterfaceThatShouldNotBeADataType), fullyQualifiedName: "jsii-calc.compliance.IInterfaceThatShouldNotBeADataType")]
    internal sealed class IInterfaceThatShouldNotBeADataTypeProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IInterfaceThatShouldNotBeADataType
    {
        private IInterfaceThatShouldNotBeADataTypeProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "otherValue", typeJson: "{\"primitive\":\"string\"}")]
        public string OtherValue
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public string Value
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "doThings")]
        public void DoThings()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
