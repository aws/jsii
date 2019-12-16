using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DoNotOverridePrivates), fullyQualifiedName: "jsii-calc.DoNotOverridePrivates")]
    public class DoNotOverridePrivates : DeputyBase
    {
        /// <summary></summary>
        public DoNotOverridePrivates(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected DoNotOverridePrivates(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected DoNotOverridePrivates(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="newValue"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "changePrivatePropertyValue", parametersJson: "[{\"name\":\"newValue\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ChangePrivatePropertyValue(string newValue)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(string)}, new object[]{newValue});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "privateMethodValue", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string PrivateMethodValue()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "privatePropertyValue", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string PrivatePropertyValue()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
