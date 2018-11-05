using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIReturnsNumber), "jsii-calc.IReturnsNumber")]
    public interface IIReturnsNumber
    {
        [JsiiProperty("numberProp", "{\"primitive\":\"number\"}")]
        double NumberProp
        {
            get;
        }

        [JsiiMethod("obtainNumber", "{\"primitive\":\"number\"}", "[]")]
        double ObtainNumber();
    }
}