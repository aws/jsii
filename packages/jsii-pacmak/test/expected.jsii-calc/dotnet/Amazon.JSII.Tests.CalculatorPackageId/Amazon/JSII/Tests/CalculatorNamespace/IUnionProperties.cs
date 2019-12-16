using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IUnionProperties), fullyQualifiedName: "jsii-calc.UnionProperties")]
    public interface IUnionProperties
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.AllTypes\"}]}}")]
        object Bar
        {
            get;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]}}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        object Foo
        {
            get
            {
                return null;
            }
        }
    }
}
