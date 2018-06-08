using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.JSObjectLiteralToNative", "[]")]
    public class JSObjectLiteralToNative : DeputyBase
    {
        public JSObjectLiteralToNative(): base(new DeputyProps(new object[]{}))
        {
        }

        protected JSObjectLiteralToNative(ByRefValue reference): base(reference)
        {
        }

        protected JSObjectLiteralToNative(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("returnLiteral", "{\"fqn\":\"jsii$jsii_calc$.JSObjectLiteralToNativeClass\"}", "[]")]
        public virtual JSObjectLiteralToNativeClass ReturnLiteral()
        {
            return InvokeMethod<JSObjectLiteralToNativeClass>(new object[]{});
        }
    }
}