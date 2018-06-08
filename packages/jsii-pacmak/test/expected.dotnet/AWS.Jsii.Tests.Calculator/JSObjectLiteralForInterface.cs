using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.JSObjectLiteralForInterface", "[]")]
    public class JSObjectLiteralForInterface : DeputyBase
    {
        public JSObjectLiteralForInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected JSObjectLiteralForInterface(ByRefValue reference): base(reference)
        {
        }

        protected JSObjectLiteralForInterface(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("giveMeFriendly", "{\"fqn\":\"jsii$jsii_calc_lib$.IFriendly\"}", "[]")]
        public virtual IIFriendly GiveMeFriendly()
        {
            return InvokeMethod<IIFriendly>(new object[]{});
        }

        [JsiiMethod("giveMeFriendlyGenerator", "{\"fqn\":\"jsii$jsii_calc$.IFriendlyRandomGenerator\"}", "[]")]
        public virtual IIFriendlyRandomGenerator GiveMeFriendlyGenerator()
        {
            return InvokeMethod<IIFriendlyRandomGenerator>(new object[]{});
        }
    }
}