using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This test is used to validate the runtimes can return correctly from a void callback.</summary>
    /// <remarks>
    /// - Implement `overrideMe` (method does not have to do anything).
    /// - Invoke `callMe`
    /// - Verify that `methodWasCalled` is `true`.
    /// </remarks>
    [JsiiClass(nativeType: typeof(VoidCallback), fullyQualifiedName: "jsii-calc.VoidCallback")]
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

        [JsiiMethod(name: "callMe")]
        public virtual void CallMe()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "overrideMe")]
        protected abstract void OverrideMe();


        [JsiiProperty(name: "methodWasCalled", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool MethodWasCalled
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
