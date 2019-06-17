using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(InbetweenClass), fullyQualifiedName: "jsii-calc.InbetweenClass")]
    public class InbetweenClass : PublicClass, IIPublicInterface2
    {
        public InbetweenClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected InbetweenClass(ByRefValue reference): base(reference)
        {
        }

        protected InbetweenClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Ciao()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
