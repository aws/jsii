using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// deprecated: it just wraps a string
    /// stability: deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDeprecatedStruct), fullyQualifiedName: "jsii-calc.DeprecatedStruct")]
    [System.Obsolete()]
    internal sealed class DeprecatedStructProxy : DeputyBase, IDeprecatedStruct
    {
        private DeprecatedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// deprecated: well, yeah
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete()]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
