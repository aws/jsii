using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IReturnsNumber), fullyQualifiedName: "jsii-calc.IReturnsNumber")]
    public interface IReturnsNumber
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Number\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number NumberProp
        {
            get;
        }
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "obtainNumber", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable ObtainNumber();
    }
}
