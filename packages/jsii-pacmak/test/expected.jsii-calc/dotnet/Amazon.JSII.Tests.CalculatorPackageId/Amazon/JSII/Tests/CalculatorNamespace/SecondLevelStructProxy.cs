using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(ISecondLevelStruct), fullyQualifiedName: "jsii-calc.SecondLevelStruct")]
    internal sealed class SecondLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.ISecondLevelStruct
    {
        private SecondLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>It's long and required.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "deeperRequiredProp", typeJson: "{\"primitive\":\"string\"}")]
        public string DeeperRequiredProp
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary>It's long, but you'll almost never pass it.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "deeperOptionalProp", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string DeeperOptionalProp
        {
            get => GetInstanceProperty<string>();
        }
    }
}
