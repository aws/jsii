using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassThatImplementsThePrivateInterface), fullyQualifiedName: "jsii-calc.ClassThatImplementsThePrivateInterface")]
    public class ClassThatImplementsThePrivateInterface : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.INonInternalInterface
    {
        /// <summary></summary>
        public ClassThatImplementsThePrivateInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected ClassThatImplementsThePrivateInterface(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected ClassThatImplementsThePrivateInterface(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string B
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "c", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string C
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "e", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string E
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
