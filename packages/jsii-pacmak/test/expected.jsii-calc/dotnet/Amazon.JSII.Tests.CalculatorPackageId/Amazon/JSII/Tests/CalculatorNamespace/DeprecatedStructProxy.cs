using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Deprecated</remarks>
    [JsiiTypeProxy(nativeType: typeof(IDeprecatedStruct), fullyQualifiedName: "jsii-calc.DeprecatedStruct")]
    [System.Obsolete("for the show")]
    internal sealed class DeprecatedStructProxy : DeputyBase, IDeprecatedStruct
    {
        private DeprecatedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("for the show")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}