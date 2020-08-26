using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule.Namespaced), fullyQualifiedName: "jsii-calc.submodule.nested_submodule.Namespaced")]
    public abstract class Namespaced : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule.DeeplyNested.INamespaced
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Namespaced(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Namespaced(DeputyProps props): base(props)
        {
        }

        [JsiiProperty(name: "definedAt", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string DefinedAt
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "goodness", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.Goodness\"}")]
        public abstract Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.Goodness Goodness
        {
            get;
        }
    }
}
