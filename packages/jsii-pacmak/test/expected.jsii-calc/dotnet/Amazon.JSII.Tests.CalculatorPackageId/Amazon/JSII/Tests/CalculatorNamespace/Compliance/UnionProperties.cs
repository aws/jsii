using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.UnionProperties")]
    public class UnionProperties : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IUnionProperties
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.compliance.AllTypes\"}]}}", isOverride: true)]
        public object Bar
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "foo", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]}}", isOptional: true, isOverride: true)]
        public object? Foo
        {
            get;
            set;
        }
    }
}
