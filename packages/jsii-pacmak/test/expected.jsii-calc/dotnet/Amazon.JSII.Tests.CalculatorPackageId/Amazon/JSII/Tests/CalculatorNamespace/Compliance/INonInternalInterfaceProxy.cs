using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(INonInternalInterface), fullyQualifiedName: "jsii-calc.compliance.INonInternalInterface")]
    internal sealed class INonInternalInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.INonInternalInterface
    {
        private INonInternalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        public string B
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "c", typeJson: "{\"primitive\":\"string\"}")]
        public string C
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
