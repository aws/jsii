using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CustomSubmoduleName
{
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IReflectable), fullyQualifiedName: "@scope/jsii-calc-lib.submodule.IReflectable")]
    [System.Obsolete()]
    internal sealed class IReflectableProxy : DeputyBase, Amazon.JSII.Tests.CustomSubmoduleName.IReflectable
    {
        private IReflectableProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "entries", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.submodule.ReflectableEntry\"},\"kind\":\"array\"}}")]
        [System.Obsolete()]
        public Amazon.JSII.Tests.CustomSubmoduleName.IReflectableEntry[] Entries
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CustomSubmoduleName.IReflectableEntry[]>();
        }
    }
}
