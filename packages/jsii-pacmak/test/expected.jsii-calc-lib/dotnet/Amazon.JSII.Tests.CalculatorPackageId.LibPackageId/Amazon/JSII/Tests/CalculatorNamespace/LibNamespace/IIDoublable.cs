using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>The general contract for a concrete number.</summary>
    [JsiiInterface(nativeType: typeof(IIDoublable), fullyQualifiedName: "@scope/jsii-calc-lib.IDoublable")]
    public interface IIDoublable
    {
        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        double DoubleValue
        {
            get;
        }
    }
}