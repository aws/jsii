using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IReturnsNumber), fullyQualifiedName: "jsii-calc.IReturnsNumber")]
    public interface IReturnsNumber
    {
        [JsiiProperty(name: "numberProp", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Number\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number NumberProp
        {
            get;
        }
        [JsiiMethod(name: "obtainNumber", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable ObtainNumber();
    }
}
