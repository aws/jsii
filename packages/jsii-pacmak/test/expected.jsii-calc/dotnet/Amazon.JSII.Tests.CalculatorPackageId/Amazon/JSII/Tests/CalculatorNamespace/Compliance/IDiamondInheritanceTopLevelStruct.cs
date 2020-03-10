using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDiamondInheritanceTopLevelStruct), fullyQualifiedName: "jsii-calc.compliance.DiamondInheritanceTopLevelStruct")]
    public interface IDiamondInheritanceTopLevelStruct : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDiamondInheritanceFirstMidLevelStruct, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDiamondInheritanceSecondMidLevelStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "topLevelProperty", typeJson: "{\"primitive\":\"string\"}")]
        string TopLevelProperty
        {
            get;
        }
    }
}
