using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>See</strong>: https://github.com/aws/jsii/issues/903
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OverridableProtectedMember), fullyQualifiedName: "jsii-calc.OverridableProtectedMember")]
    public class OverridableProtectedMember : DeputyBase
    {
        public OverridableProtectedMember(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OverridableProtectedMember(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OverridableProtectedMember(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMe", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        protected virtual string OverrideMe()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "switchModes")]
        public virtual void SwitchModes()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "valueFromProtected", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string ValueFromProtected()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "overrideReadOnly", typeJson: "{\"primitive\":\"string\"}")]
        protected virtual string OverrideReadOnly
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "overrideReadWrite", typeJson: "{\"primitive\":\"string\"}")]
        protected virtual string OverrideReadWrite
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
