using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.Polymorphism", "[]")]
    public class Polymorphism : DeputyBase
    {
        public Polymorphism(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Polymorphism(ByRefValue reference): base(reference)
        {
        }

        protected Polymorphism(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("sayHello", "{\"primitive\":\"string\"}", "[{\"name\":\"friendly\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.IFriendly\"}}]")]
        public virtual string SayHello(IIFriendly friendly)
        {
            return InvokeMethod<string>(new object[]{friendly});
        }
    }
}