using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDiamondInheritanceFirstMidLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceFirstMidLevelStruct")]
    public interface IDiamondInheritanceFirstMidLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceBaseLevelStruct
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
