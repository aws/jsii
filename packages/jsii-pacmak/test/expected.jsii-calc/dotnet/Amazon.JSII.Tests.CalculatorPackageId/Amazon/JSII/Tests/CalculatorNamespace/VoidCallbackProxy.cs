using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This test is used to validate the runtimes can return correctly from a void callback.</summary>
    /// <remarks>
    /// <list type="bullet">
    /// <description>Implement <c>overrideMe</c> (method does not have to do anything).</description>
    /// <description>Invoke <c>callMe</c></description>
    /// <description>Verify that <c>methodWasCalled</c> is <c>true</c>.</description>
    /// </list>
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VoidCallback), fullyQualifiedName: "jsii-calc.VoidCallback")]
    internal sealed class VoidCallbackProxy : Amazon.JSII.Tests.CalculatorNamespace.VoidCallback
    {
        private VoidCallbackProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(name: "overrideMe")]
        protected override void OverrideMe()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
