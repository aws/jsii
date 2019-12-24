using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This is here to check that we can pass a nested struct into a kwargs by specifying it as an in-line dictionary.</summary>
    /// <remarks>
    /// This is cheating with the (current) declared types, but this is the "more
    /// idiomatic" way for Pythonists.
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IRootStruct), fullyQualifiedName: "jsii-calc.RootStruct")]
    internal sealed class RootStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IRootStruct
    {
        private RootStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>May not be empty.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "stringProp", typeJson: "{\"primitive\":\"string\"}")]
        public string StringProp
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "nestedStruct", typeJson: "{\"fqn\":\"jsii-calc.NestedStruct\"}", isOptional: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.INestedStruct NestedStruct
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.INestedStruct>();
        }
    }
}
