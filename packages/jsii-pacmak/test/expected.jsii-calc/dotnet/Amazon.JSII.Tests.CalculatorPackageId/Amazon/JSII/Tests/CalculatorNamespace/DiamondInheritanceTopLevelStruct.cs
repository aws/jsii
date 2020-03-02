using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.DiamondInheritanceTopLevelStruct")]
    public class DiamondInheritanceTopLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceTopLevelStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "topLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string TopLevelProperty
        {
            get;
            set;
        }

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

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondMidLevelProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string SecondMidLevelProperty
        {
            get;
            set;
        }
    }
}
