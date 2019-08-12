using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDiamondInheritanceFirstMidLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceFirstMidLevelStruct")]
    internal sealed class DiamondInheritanceFirstMidLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceFirstMidLevelStruct
    {
        private DiamondInheritanceFirstMidLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "firstMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string FirstMidLevelProperty
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
