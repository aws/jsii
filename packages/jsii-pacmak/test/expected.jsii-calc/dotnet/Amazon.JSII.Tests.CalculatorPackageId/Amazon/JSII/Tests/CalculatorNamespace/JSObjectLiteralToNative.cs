using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralToNative), fullyQualifiedName: "jsii-calc.JSObjectLiteralToNative")]
    public class JSObjectLiteralToNative : DeputyBase
    {
        public JSObjectLiteralToNative(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JSObjectLiteralToNative(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JSObjectLiteralToNative(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnLiteral", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.JSObjectLiteralToNativeClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralToNativeClass ReturnLiteral()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralToNativeClass>(new System.Type[]{}, new object[]{});
        }
    }
}
