using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties.Derived), fullyQualifiedName: "jsii-calc.DerivedClassHasNoProperties.Derived")]
    public class Derived : Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties.Base
    {
        public Derived(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Derived(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Derived(DeputyProps props): base(props)
        {
        }
    }
}
