using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This test is used to validate the runtimes can return correctly from a void callback.</summary>
    /// <remarks>
    /// - Implement `overrideMe` (method does not have to do anything).
    /// - Invoke `callMe`
    /// - Verify that `methodWasCalled` is `true`.
    /// stability: experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(VoidCallback), fullyQualifiedName: "jsii-calc.VoidCallback")]
    internal sealed class VoidCallbackProxy : VoidCallback
    {
        private VoidCallbackProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMe")]
        protected override void OverrideMe()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
