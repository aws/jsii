using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(INestedStruct), fullyQualifiedName: "jsii-calc.NestedStruct")]
    public interface INestedStruct
    {
        /// <summary>When provided, must be &gt; 0.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"primitive\":\"number\"}")]
        double NumberProp
        {
            get;
        }
    }
}
