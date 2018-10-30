using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIReturnsNumber), "jsii-calc.IReturnsNumber")]
    public interface IIReturnsNumber
    {
        [JsiiProperty("numberProp", "{\"fqn\":\"@scope/jsii-calc-lib.Number\"}")]
        Number NumberProp
        {
            get;
        }

        [JsiiMethod("obtainNumber", "{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"}", "[]")]
        IIDoublable ObtainNumber();
    }
}