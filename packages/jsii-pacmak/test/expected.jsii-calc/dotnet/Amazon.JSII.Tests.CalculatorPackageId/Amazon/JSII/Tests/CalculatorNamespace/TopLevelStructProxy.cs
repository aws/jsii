using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(ITopLevelStruct), fullyQualifiedName: "jsii-calc.TopLevelStruct")]
    internal sealed class TopLevelStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct
    {
        private TopLevelStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>This is a required field.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "required", typeJson: "{\"primitive\":\"string\"}")]
        public string Required
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary>A union to really stress test our serialization.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "secondLevel", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.SecondLevelStruct\"}]}}")]
        public object SecondLevel
        {
            get => GetInstanceProperty<object>();
        }

        /// <summary>You don't have to pass this.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "optional", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Optional
        {
            get => GetInstanceProperty<string>();
        }
    }
}
