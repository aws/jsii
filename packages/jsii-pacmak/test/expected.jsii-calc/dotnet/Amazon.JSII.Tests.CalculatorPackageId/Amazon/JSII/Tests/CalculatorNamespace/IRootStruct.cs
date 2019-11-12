using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This is here to check that we can pass a nested struct into a kwargs by specifying it as an in-line dictionary.</summary>
    /// <remarks>
    /// This is cheating with the declared types, but Python people don't play by
    /// the rules much apparently.
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IRootStruct), fullyQualifiedName: "jsii-calc.RootStruct")]
    public interface IRootStruct
    {
        /// <summary>May not be empty.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "stringProp", typeJson: "{\"primitive\":\"string\"}")]
        string StringProp
        {
            get;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "nestedStruct", typeJson: "{\"fqn\":\"jsii-calc.NestedStruct\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        Amazon.JSII.Tests.CalculatorNamespace.INestedStruct NestedStruct
        {
            get
            {
                return null;
            }
        }
    }
}
