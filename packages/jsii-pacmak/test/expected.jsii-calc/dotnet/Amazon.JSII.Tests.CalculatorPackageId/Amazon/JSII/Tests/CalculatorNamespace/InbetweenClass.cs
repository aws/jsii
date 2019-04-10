using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
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

        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Ciao()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}