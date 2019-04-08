using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>The general contract for a concrete number.</summary>
    [JsiiInterface(typeof(IIDoublable), "@scope/jsii-calc-lib.IDoublable")]
    public interface IIDoublable
    {
        [JsiiProperty("doubleValue", "{\"primitive\":\"number\"}")]
        double DoubleValue
        {
            get;
        }
    }
}