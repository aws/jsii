using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very), fullyQualifiedName: "@scope/jsii-calc-base-of-base.Very")]
    public class Very : DeputyBase
    {
        public Very(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Very(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Very(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "hey", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double Hey()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }
    }
}
