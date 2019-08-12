using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDiamondInheritanceTopLevelStruct), fullyQualifiedName: "jsii-calc.DiamondInheritanceTopLevelStruct")]
    public interface IDiamondInheritanceTopLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceFirstMidLevelStruct, Amazon.JSII.Tests.CalculatorNamespace.IDiamondInheritanceSecondMidLevelStruct
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "topLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        string TopLevelProperty
        {
            get;
        }
    }
}
