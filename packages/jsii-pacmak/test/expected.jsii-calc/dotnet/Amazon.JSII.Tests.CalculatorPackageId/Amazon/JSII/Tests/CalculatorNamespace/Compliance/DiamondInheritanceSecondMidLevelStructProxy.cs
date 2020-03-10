using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDiamondInheritanceSecondMidLevelStruct), fullyQualifiedName: "jsii-calc.compliance.DiamondInheritanceSecondMidLevelStruct")]
    internal sealed class DiamondInheritanceSecondMidLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDiamondInheritanceSecondMidLevelStruct
    {
        private DiamondInheritanceSecondMidLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string SecondMidLevelProperty
        {
            get => GetInstanceProperty<string>();
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
