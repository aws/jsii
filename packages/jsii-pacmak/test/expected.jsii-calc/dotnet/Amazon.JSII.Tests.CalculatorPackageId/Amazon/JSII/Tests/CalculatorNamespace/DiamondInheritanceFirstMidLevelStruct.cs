using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.DiamondInheritanceFirstMidLevelStruct")]
    public class DiamondInheritanceFirstMidLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceFirstMidLevelStruct
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "firstMidLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string FirstMidLevelProperty
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "baseLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string BaseLevelProperty
        {
            get;
            set;
        }
    }
}
