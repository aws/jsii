using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue]
    public class UnionProperties : Amazon.JSII.Tests.CalculatorNamespace.IUnionProperties
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.AllTypes\"}]}}", isOverride: true)]
        public object Bar
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]}}", isOptional: true, isOverride: true)]
        [JsiiOptional]
        public object Foo
        {
            get;
            set;
        }
    }
}
