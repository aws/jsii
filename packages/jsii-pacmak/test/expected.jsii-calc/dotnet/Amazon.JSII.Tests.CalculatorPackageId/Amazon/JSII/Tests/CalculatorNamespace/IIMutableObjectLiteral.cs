using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IIMutableObjectLiteral), fullyQualifiedName: "jsii-calc.IMutableObjectLiteral")]
    public interface IIMutableObjectLiteral
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
            set;
        }
    }
}