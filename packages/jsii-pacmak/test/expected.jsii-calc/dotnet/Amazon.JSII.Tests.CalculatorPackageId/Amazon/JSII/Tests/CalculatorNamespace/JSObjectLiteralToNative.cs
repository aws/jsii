using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralToNative), fullyQualifiedName: "jsii-calc.JSObjectLiteralToNative")]
    public class JSObjectLiteralToNative : DeputyBase
    {
        /// <summary></summary>
        public JSObjectLiteralToNative(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected JSObjectLiteralToNative(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected JSObjectLiteralToNative(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnLiteral", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.JSObjectLiteralToNativeClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralToNativeClass ReturnLiteral()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralToNativeClass>(new System.Type[]{}, new object[]{});
        }
    }
}
