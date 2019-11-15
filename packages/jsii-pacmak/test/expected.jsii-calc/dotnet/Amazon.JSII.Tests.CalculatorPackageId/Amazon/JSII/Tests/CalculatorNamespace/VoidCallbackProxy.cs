using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This test is used to validate the runtimes can return correctly from a void callback.</summary>
    /// <remarks>
    /// * Implement <c>overrideMe</c> (method does not have to do anything).
    /// * Invoke <c>callMe</c>
    /// * Verify that <c>methodWasCalled</c> is <c>true</c>.
    /// 
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VoidCallback), fullyQualifiedName: "jsii-calc.VoidCallback")]
    internal sealed class VoidCallbackProxy : Amazon.JSII.Tests.CalculatorNamespace.VoidCallback
    {
        private VoidCallbackProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMe")]
        protected override void OverrideMe()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
