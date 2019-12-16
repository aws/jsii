using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties.Derived), fullyQualifiedName: "jsii-calc.DerivedClassHasNoProperties.Derived")]
    public class Derived : Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties.Base
    {
        /// <summary></summary>
        public Derived(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected Derived(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected Derived(DeputyProps props): base(props)
        {
        }
    }
}
