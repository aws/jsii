using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(ICalculatorProps), fullyQualifiedName: "jsii-calc.CalculatorProps")]
    public interface ICalculatorProps
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "initialValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        double? InitialValue
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "maximumValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        double? MaximumValue
        {
            get;
        }
    }
}