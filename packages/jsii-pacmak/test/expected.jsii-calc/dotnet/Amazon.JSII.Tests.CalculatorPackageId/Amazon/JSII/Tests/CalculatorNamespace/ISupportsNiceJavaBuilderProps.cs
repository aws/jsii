using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(ISupportsNiceJavaBuilderProps), fullyQualifiedName: "jsii-calc.SupportsNiceJavaBuilderProps")]
    public interface ISupportsNiceJavaBuilderProps
    {
        /// <summary>Some number, like 42.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"number\"}")]
        double Bar
        {
            get;
        }

        /// <summary>An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.</summary>
        /// <remarks>
        /// But here we are, doing it like we didn't care.
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "id", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Id
        {
            get;
        }
    }
}
