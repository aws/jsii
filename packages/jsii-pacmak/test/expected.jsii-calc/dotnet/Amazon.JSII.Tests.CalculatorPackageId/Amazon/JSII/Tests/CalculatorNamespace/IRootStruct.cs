using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This is here to check that we can pass a nested struct into a kwargs by specifying it as an in-line dictionary.</summary>
    /// <remarks>
    /// This is cheating with the (current) declared types, but this is the "more
    /// idiomatic" way for Pythonists.
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IRootStruct), fullyQualifiedName: "jsii-calc.RootStruct")]
    public interface IRootStruct
    {
        /// <summary>May not be empty.</summary>
        [JsiiProperty(name: "stringProp", typeJson: "{\"primitive\":\"string\"}")]
        string StringProp
        {
            get;
        }

        [JsiiProperty(name: "nestedStruct", typeJson: "{\"fqn\":\"jsii-calc.NestedStruct\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        Amazon.JSII.Tests.CalculatorNamespace.INestedStruct? NestedStruct
        {
            get
            {
                return null;
            }
        }
    }
}
