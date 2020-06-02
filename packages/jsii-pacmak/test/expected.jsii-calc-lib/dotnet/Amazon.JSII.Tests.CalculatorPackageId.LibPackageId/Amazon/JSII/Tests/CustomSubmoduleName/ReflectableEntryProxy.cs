using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CustomSubmoduleName
{
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IReflectableEntry), fullyQualifiedName: "@scope/jsii-calc-lib.submodule.ReflectableEntry")]
    [System.Obsolete()]
    internal sealed class ReflectableEntryProxy : DeputyBase, Amazon.JSII.Tests.CustomSubmoduleName.IReflectableEntry
    {
        private ReflectableEntryProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "key", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete()]
        public string Key
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"any\"}")]
        [System.Obsolete()]
        public object Value
        {
            get => GetInstanceProperty<object>();
        }
    }
}
