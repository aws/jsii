using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(JSObjectLiteralForInterface), "jsii-calc.JSObjectLiteralForInterface", "[]")]
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

        [JsiiMethod("giveMeFriendly", "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}}", "[]")]
        public virtual IIFriendly GiveMeFriendly()
        {
            return InvokeInstanceMethod<IIFriendly>(new object[]{});
        }

        [JsiiMethod("giveMeFriendlyGenerator", "{\"type\":{\"fqn\":\"jsii-calc.IFriendlyRandomGenerator\"}}", "[]")]
        public virtual IIFriendlyRandomGenerator GiveMeFriendlyGenerator()
        {
            return InvokeInstanceMethod<IIFriendlyRandomGenerator>(new object[]{});
        }
    }
}