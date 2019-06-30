using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IIReturnsNumber), fullyQualifiedName: "jsii-calc.IReturnsNumber")]
    public interface IIReturnsNumber
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "numberProp", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Number\"}")]
        Number NumberProp
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "obtainNumber", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}}")]
        IIDoublable ObtainNumber();
    }
}