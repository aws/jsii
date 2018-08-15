using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IReturnsNumber), "jsii-calc.ReturnsNumber")]
    public interface IReturnsNumber
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