using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.DerivedClassHasNoProperties
{
    [JsiiClass(typeof(Derived), "jsii-calc.DerivedClassHasNoProperties.Derived", "[]")]
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