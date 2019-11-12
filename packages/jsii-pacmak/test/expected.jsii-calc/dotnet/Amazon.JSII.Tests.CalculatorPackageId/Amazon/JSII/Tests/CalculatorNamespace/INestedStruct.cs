using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(INestedStruct), fullyQualifiedName: "jsii-calc.NestedStruct")]
    public interface INestedStruct
    {
        /// <summary>When provided, must be > 0.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"primitive\":\"number\"}")]
        double NumberProp
        {
            get;
        }
    }
}
