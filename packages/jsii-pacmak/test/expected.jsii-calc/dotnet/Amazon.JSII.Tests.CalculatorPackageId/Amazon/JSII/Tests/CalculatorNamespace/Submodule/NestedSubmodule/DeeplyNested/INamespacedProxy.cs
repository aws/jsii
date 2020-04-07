using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule.DeeplyNested
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(INamespaced), fullyQualifiedName: "jsii-calc.submodule.nested_submodule.deeplyNested.INamespaced")]
    internal sealed class INamespacedProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule.DeeplyNested.INamespaced
    {
        private INamespacedProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "definedAt", typeJson: "{\"primitive\":\"string\"}")]
        public string DefinedAt
        {
            get => GetInstanceProperty<string>();
        }
    }
}
