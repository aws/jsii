using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(DoNotOverridePrivates), fullyQualifiedName: "jsii-calc.DoNotOverridePrivates")]
    public class DoNotOverridePrivates : DeputyBase
    {
        public DoNotOverridePrivates(): base(new DeputyProps(new object[]{}))
        {
        }

        protected DoNotOverridePrivates(ByRefValue reference): base(reference)
        {
        }

        protected DoNotOverridePrivates(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "changePrivatePropertyValue", parametersJson: "[{\"name\":\"newValue\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ChangePrivatePropertyValue(string newValue)
        {
            InvokeInstanceVoidMethod(new object[]{newValue});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "privateMethodValue", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string PrivateMethodValue()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "privatePropertyValue", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string PrivatePropertyValue()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
