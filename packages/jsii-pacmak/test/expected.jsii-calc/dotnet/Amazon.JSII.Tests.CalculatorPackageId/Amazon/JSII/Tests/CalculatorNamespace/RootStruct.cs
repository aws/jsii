using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This is here to check that we can pass a nested struct into a kwargs by specifying it as an in-line dictionary.</summary>
    /// <remarks>
    /// This is cheating with the declared types, but Python people don't play by
    /// the rules much apparently.
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.RootStruct")]
    public class RootStruct : Amazon.JSII.Tests.CalculatorNamespace.IRootStruct
    {
        /// <summary>May not be empty.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "stringProp", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string StringProp
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "nestedStruct", typeJson: "{\"fqn\":\"jsii-calc.NestedStruct\"}", isOptional: true, isOverride: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.INestedStruct NestedStruct
        {
            get;
            set;
        }
    }
}
