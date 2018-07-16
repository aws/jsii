using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator.DerivedClassHasNoProperties
{
    [JsiiClass(typeof(Derived), "jsii-calc.DerivedClassHasNoProperties.Derived", "[]")]
    public class Derived : AWS.Jsii.Tests.Calculator.DerivedClassHasNoProperties.Base
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