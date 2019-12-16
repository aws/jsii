using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDeprecatedStruct), fullyQualifiedName: "jsii-calc.DeprecatedStruct")]
    [System.Obsolete("it just wraps a string")]
    internal sealed class DeprecatedStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IDeprecatedStruct
    {
        private DeprecatedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("well, yeah")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
