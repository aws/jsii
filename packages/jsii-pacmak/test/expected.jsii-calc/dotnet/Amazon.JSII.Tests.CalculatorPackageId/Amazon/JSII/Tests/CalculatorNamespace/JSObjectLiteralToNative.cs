using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(JSObjectLiteralToNative), fullyQualifiedName: "jsii-calc.JSObjectLiteralToNative")]
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

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnLiteral", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.JSObjectLiteralToNativeClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralToNativeClass ReturnLiteral()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralToNativeClass>(new object[]{});
        }
    }
}
