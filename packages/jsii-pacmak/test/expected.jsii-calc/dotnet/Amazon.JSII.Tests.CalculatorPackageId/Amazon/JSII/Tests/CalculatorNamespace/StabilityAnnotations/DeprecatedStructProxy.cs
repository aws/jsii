using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations
{
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDeprecatedStruct), fullyQualifiedName: "jsii-calc.stability_annotations.DeprecatedStruct")]
    [System.Obsolete("it just wraps a string")]
    internal sealed class DeprecatedStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations.IDeprecatedStruct
    {
        private DeprecatedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("well, yeah")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
