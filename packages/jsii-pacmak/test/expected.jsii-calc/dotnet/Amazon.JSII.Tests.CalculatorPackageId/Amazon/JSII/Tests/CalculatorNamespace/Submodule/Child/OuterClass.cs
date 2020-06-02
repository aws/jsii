using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    /// <summary>Checks that classes can self-reference during initialization.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>See</strong>: : https://github.com/aws/jsii/pull/1706
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.OuterClass), fullyQualifiedName: "jsii-calc.submodule.child.OuterClass")]
    public class OuterClass : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public OuterClass(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OuterClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OuterClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "innerClass", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.InnerClass\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.InnerClass InnerClass
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.InnerClass>();
        }
    }
}
