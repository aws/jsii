using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.JSObjectLiteralToNative), fullyQualifiedName: "jsii-calc.compliance.JSObjectLiteralToNative")]
    public class JSObjectLiteralToNative : DeputyBase
    {
        public JSObjectLiteralToNative(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JSObjectLiteralToNative(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JSObjectLiteralToNative(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnLiteral", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.JSObjectLiteralToNativeClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.JSObjectLiteralToNativeClass ReturnLiteral()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.JSObjectLiteralToNativeClass>(new System.Type[]{}, new object[]{});
        }
    }
}
