using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDiamondInheritanceTopLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceTopLevelStruct")]
    internal sealed class DiamondInheritanceTopLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceTopLevelStruct
    {
        private DiamondInheritanceTopLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "topLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string TopLevelProperty
        {
            get => GetInstanceProperty<string>();
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

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string SecondMidLevelProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
