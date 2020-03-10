using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDiamondInheritanceSecondMidLevelStruct), fullyQualifiedName: "jsii-calc.compliance.DiamondInheritanceSecondMidLevelStruct")]
    public interface IDiamondInheritanceSecondMidLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDiamondInheritanceBaseLevelStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        string SecondMidLevelProperty
        {
            get;
        }
    }
}
