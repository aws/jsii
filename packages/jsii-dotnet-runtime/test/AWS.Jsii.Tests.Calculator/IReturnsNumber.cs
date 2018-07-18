using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
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