using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule
{
    /// <summary> (experimental)</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule.Namespaced), fullyQualifiedName: "jsii-calc.submodule.nested_submodule.Namespaced")]
    internal sealed class NamespacedProxy : Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule.Namespaced
    {
        private NamespacedProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "goodness", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.Goodness\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.Goodness Goodness
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.Goodness>();
        }
    }
}
