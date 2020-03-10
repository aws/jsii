using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IConfusingToJacksonStruct), fullyQualifiedName: "jsii-calc.compliance.ConfusingToJacksonStruct")]
    public interface IConfusingToJacksonStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.compliance.AbstractClass\"},{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}]}},\"kind\":\"array\"}}]}}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        object? UnionProperty
        {
            get
            {
                return null;
            }
        }
    }
}
