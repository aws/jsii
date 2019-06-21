using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties;

namespace Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Derived), fullyQualifiedName: "jsii-calc.DerivedClassHasNoProperties.Derived")]
    public class Derived : Base
    {
        public Derived(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Derived(ByRefValue reference): base(reference)
        {
        }

        protected Derived(DeputyProps props): base(props)
        {
        }
    }
}
