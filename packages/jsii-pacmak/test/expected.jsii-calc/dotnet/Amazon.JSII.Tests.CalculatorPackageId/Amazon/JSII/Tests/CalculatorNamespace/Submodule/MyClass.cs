using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.MyClass), fullyQualifiedName: "jsii-calc.submodule.MyClass", parametersJson: "[{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.submodule.child.SomeStruct\"}}]")]
    public class MyClass : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Submodule.NestedSubmodule.DeeplyNested.INamespaced
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public MyClass(Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.ISomeStruct props): base(new DeputyProps(new object[]{props}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected MyClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected MyClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "awesomeness", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.Awesomeness\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.Awesomeness Awesomeness
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.Awesomeness>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "definedAt", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string DefinedAt
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "goodness", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.Goodness\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.Goodness Goodness
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.Goodness>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "props", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.SomeStruct\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.ISomeStruct Props
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.ISomeStruct>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "allTypes", typeJson: "{\"fqn\":\"jsii-calc.AllTypes\"}", isOptional: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.AllTypes? AllTypes
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.AllTypes?>();
            set => SetInstanceProperty(value);
        }
    }
}
