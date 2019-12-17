using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.ConfusingToJacksonStruct")]
    public class ConfusingToJacksonStruct : Amazon.JSII.Tests.CalculatorNamespace.IConfusingToJacksonStruct
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"fqn\":\"jsii-calc.AbstractClass\"}]}},\"kind\":\"array\"}}]}}", isOptional: true, isOverride: true)]
        public object UnionProperty
        {
            get;
            set;
        }
    }
}
