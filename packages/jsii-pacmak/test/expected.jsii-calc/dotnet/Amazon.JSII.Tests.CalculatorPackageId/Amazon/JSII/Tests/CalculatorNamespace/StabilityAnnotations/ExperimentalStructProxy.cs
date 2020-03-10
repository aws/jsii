using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IExperimentalStruct), fullyQualifiedName: "jsii-calc.stability_annotations.ExperimentalStruct")]
    internal sealed class ExperimentalStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations.IExperimentalStruct
    {
        private ExperimentalStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
