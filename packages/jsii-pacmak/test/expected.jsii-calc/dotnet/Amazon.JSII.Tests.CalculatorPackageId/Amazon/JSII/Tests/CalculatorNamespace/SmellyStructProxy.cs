using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(ISmellyStruct), fullyQualifiedName: "jsii-calc.SmellyStruct")]
    internal sealed class SmellyStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.ISmellyStruct
    {
        private SmellyStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        public string Property
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "yetAnoterOne", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool YetAnoterOne
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
