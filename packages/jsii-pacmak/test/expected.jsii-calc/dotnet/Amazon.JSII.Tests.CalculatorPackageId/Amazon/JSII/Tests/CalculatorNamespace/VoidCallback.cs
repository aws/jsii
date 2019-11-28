using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This test is used to validate the runtimes can return correctly from a void callback.</summary>
    /// <remarks>
    /// <list type="bullet">
    /// <description>Implement <c>overrideMe</c> (method does not have to do anything).</description>
    /// <description>Invoke <c>callMe</c></description>
    /// <description>Verify that <c>methodWasCalled</c> is <c>true</c>.</description>
    /// </list>
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VoidCallback), fullyQualifiedName: "jsii-calc.VoidCallback")]
    public abstract class VoidCallback : DeputyBase
    {
        protected VoidCallback(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected VoidCallback(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected VoidCallback(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "callMe")]
        public virtual void CallMe()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMe")]
        protected abstract void OverrideMe();


        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "methodWasCalled", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool MethodWasCalled
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
