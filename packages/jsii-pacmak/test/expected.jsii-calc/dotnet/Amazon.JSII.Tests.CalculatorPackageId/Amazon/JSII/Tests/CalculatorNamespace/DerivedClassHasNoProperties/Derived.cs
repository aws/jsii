using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties.Derived), fullyQualifiedName: "jsii-calc.DerivedClassHasNoProperties.Derived")]
    public class Derived : Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties.Base
    {
        public Derived(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Derived(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Derived(DeputyProps props): base(props)
        {
        }
    }
}
