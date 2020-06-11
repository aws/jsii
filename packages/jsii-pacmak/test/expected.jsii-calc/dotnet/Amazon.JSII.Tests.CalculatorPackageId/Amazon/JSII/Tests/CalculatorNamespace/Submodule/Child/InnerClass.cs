using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.InnerClass), fullyQualifiedName: "jsii-calc.submodule.child.InnerClass")]
    public class InnerClass : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public InnerClass(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected InnerClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected InnerClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "staticProp", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.SomeStruct\"}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.ISomeStruct StaticProp
        {
            get;
        }
        = GetStaticProperty<Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.ISomeStruct>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.InnerClass));
    }
}
