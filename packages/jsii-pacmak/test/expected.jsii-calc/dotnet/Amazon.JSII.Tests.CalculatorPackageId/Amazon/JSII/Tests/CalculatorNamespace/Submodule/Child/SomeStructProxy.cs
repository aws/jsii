using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(ISomeStruct), fullyQualifiedName: "jsii-calc.submodule.child.SomeStruct")]
    internal sealed class SomeStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.ISomeStruct
    {
        private SomeStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "prop", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.SomeEnum\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.SomeEnum Prop
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.SomeEnum>();
        }
    }
}
