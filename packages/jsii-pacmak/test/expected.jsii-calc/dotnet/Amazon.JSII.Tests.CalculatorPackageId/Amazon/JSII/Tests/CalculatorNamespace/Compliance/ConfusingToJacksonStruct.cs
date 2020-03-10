using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.ConfusingToJacksonStruct")]
    public class ConfusingToJacksonStruct : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IConfusingToJacksonStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.compliance.AbstractClass\"},{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}]}},\"kind\":\"array\"}}]}}", isOptional: true, isOverride: true)]
        public object? UnionProperty
        {
            get;
            set;
        }
    }
}
