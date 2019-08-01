using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IExperimentalStruct), fullyQualifiedName: "jsii-calc.ExperimentalStruct")]
    internal sealed class ExperimentalStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IExperimentalStruct
    {
        private ExperimentalStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
