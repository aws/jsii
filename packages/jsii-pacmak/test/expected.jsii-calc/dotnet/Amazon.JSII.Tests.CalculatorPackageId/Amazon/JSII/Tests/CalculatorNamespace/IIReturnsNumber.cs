using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIReturnsNumber), fullyQualifiedName: "jsii-calc.IReturnsNumber")]
    public interface IIReturnsNumber
    {
        [JsiiProperty(name: "numberProp", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Number\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number NumberProp
        {
            get;
        }
        [JsiiMethod(name: "obtainNumber", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IIDoublable ObtainNumber();
    }
}
