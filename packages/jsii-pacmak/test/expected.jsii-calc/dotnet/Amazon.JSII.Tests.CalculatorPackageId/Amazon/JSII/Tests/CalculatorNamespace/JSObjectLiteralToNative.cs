using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(JSObjectLiteralToNative), "jsii-calc.JSObjectLiteralToNative", "[]")]
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

        [JsiiMethod(name: "returnLiteral", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.JSObjectLiteralToNativeClass\"}}", parametersJson: "[]")]
        public virtual JSObjectLiteralToNativeClass ReturnLiteral()
        {
            return InvokeInstanceMethod<JSObjectLiteralToNativeClass>(new object[]{});
        }
    }
}