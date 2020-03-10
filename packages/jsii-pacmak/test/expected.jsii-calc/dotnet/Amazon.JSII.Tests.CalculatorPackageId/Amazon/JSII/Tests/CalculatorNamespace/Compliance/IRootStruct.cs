using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>This is here to check that we can pass a nested struct into a kwargs by specifying it as an in-line dictionary.</summary>
    /// <remarks>
    /// This is cheating with the (current) declared types, but this is the "more
    /// idiomatic" way for Pythonists.
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IRootStruct), fullyQualifiedName: "jsii-calc.compliance.RootStruct")]
    public interface IRootStruct
    {
        /// <summary>May not be empty.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "stringProp", typeJson: "{\"primitive\":\"string\"}")]
        string StringProp
        {
            get;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "nestedStruct", typeJson: "{\"fqn\":\"jsii-calc.compliance.NestedStruct\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        Amazon.JSII.Tests.CalculatorNamespace.Compliance.INestedStruct? NestedStruct
        {
            get
            {
                return null;
            }
        }
    }
}
