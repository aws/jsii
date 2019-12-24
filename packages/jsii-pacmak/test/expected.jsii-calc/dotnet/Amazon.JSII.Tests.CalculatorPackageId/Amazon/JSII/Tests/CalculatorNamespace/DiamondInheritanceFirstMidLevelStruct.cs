using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.DiamondInheritanceFirstMidLevelStruct")]
    public class DiamondInheritanceFirstMidLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceFirstMidLevelStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "firstMidLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string FirstMidLevelProperty
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "baseLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string BaseLevelProperty
        {
            get;
            set;
        }
    }
}
