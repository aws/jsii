using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties
{
    [JsiiClass(nativeType: typeof(Derived), fullyQualifiedName: "jsii-calc.DerivedClassHasNoProperties.Derived")]
    public class Derived : Amazon.JSII.Tests.CalculatorNamespace.DerivedClassHasNoProperties.Base
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