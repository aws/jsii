using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDiamondInheritanceSecondMidLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceSecondMidLevelStruct")]
    internal sealed class DiamondInheritanceSecondMidLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceSecondMidLevelStruct
    {
        private DiamondInheritanceSecondMidLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string SecondMidLevelProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "baseLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string BaseLevelProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
