using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDiamondInheritanceBaseLevelStruct), fullyQualifiedName: "jsii-calc.compliance.DiamondInheritanceBaseLevelStruct")]
    internal sealed class DiamondInheritanceBaseLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDiamondInheritanceBaseLevelStruct
    {
        private DiamondInheritanceBaseLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "baseLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string BaseLevelProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
