using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDiamondInheritanceFirstMidLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceFirstMidLevelStruct")]
    public interface IDiamondInheritanceFirstMidLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceBaseLevelStruct
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "firstMidLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        string FirstMidLevelProperty
        {
            get;
        }
    }
}
