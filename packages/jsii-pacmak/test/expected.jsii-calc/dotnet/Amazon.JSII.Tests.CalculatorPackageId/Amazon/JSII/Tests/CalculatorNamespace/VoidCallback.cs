using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This test is used to validate the runtimes can return correctly from a void callback.</summary>
    /// <remarks>
    /// - Implement `overrideMe` (method does not have to do anything).
    /// - Invoke `callMe`
    /// - Verify that `methodWasCalled` is `true`.
    /// 
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.VoidCallback), fullyQualifiedName: "jsii-calc.VoidCallback")]
    public abstract class VoidCallback : DeputyBase
    {
        /// <summary></summary>
        protected VoidCallback(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected VoidCallback(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected VoidCallback(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "callMe")]
        public virtual void CallMe()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMe")]
        protected abstract void OverrideMe();


        /// <summary></summary>
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
