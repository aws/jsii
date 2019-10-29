using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// see:
    /// https://github.com/aws/jsii/issues/903
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OverridableProtectedMember), fullyQualifiedName: "jsii-calc.OverridableProtectedMember")]
    public class OverridableProtectedMember : DeputyBase
    {
        public OverridableProtectedMember(): base(new DeputyProps(new object[]{}))
        {
        }

        protected OverridableProtectedMember(ByRefValue reference): base(reference)
        {
        }

        protected OverridableProtectedMember(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "overrideMe", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        protected virtual string OverrideMe()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "switchModes")]
        public virtual void SwitchModes()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "valueFromProtected", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string ValueFromProtected()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "overrideReadOnly", typeJson: "{\"primitive\":\"string\"}")]
        protected virtual string OverrideReadOnly
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "overrideReadWrite", typeJson: "{\"primitive\":\"string\"}")]
        protected virtual string OverrideReadWrite
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
