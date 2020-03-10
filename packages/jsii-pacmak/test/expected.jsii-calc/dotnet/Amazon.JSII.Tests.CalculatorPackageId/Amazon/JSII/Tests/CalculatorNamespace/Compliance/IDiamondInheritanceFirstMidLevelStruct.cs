using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDiamondInheritanceFirstMidLevelStruct), fullyQualifiedName: "jsii-calc.compliance.DiamondInheritanceFirstMidLevelStruct")]
    public interface IDiamondInheritanceFirstMidLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDiamondInheritanceBaseLevelStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "firstMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        string FirstMidLevelProperty
        {
            get;
        }
    }
}
