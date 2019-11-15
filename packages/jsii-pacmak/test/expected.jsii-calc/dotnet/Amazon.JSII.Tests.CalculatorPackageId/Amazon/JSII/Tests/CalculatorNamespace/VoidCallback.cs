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
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VoidCallback), fullyQualifiedName: "jsii-calc.VoidCallback")]
    public abstract class VoidCallback : DeputyBase
    {
        protected VoidCallback(): base(new DeputyProps(new object[]{}))
        {
        }

        protected VoidCallback(ByRefValue reference): base(reference)
        {
        }

        protected VoidCallback(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "callMe")]
        public virtual void CallMe()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMe")]
        protected abstract void OverrideMe();


        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "methodWasCalled", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool MethodWasCalled
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
