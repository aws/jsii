using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(InbetweenClass), fullyQualifiedName: "jsii-calc.InbetweenClass")]
    public class InbetweenClass : Amazon.JSII.Tests.CalculatorNamespace.PublicClass, Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface2
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

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Ciao()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}