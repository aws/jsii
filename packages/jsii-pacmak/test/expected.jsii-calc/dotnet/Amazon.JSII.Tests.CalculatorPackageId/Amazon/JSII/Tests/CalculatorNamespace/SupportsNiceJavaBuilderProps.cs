using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    [JsiiByValue(fqn: "jsii-calc.SupportsNiceJavaBuilderProps")]
    public class SupportsNiceJavaBuilderProps : Amazon.JSII.Tests.CalculatorNamespace.ISupportsNiceJavaBuilderProps
    {
        /// <summary>Some number, like 42.</summary>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double Bar
        {
            get;
            set;
        }

        /// <summary>An `id` field here is terrible API design, because the constructor of `SupportsNiceJavaBuilder` already has a parameter named `id`.</summary>
        /// <remarks>
        /// But here we are, doing it like we didn't care.
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "id", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Id
        {
            get;
            set;
        }
    }
}
