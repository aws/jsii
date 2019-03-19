using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ImplementsInterfaceWithInternal), "jsii-calc.ImplementsInterfaceWithInternal", "[]")]
    public class ImplementsInterfaceWithInternal : DeputyBase, IIInterfaceWithInternal
    {
        public ImplementsInterfaceWithInternal(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ImplementsInterfaceWithInternal(ByRefValue reference): base(reference)
        {
        }

        protected ImplementsInterfaceWithInternal(DeputyProps props): base(props)
        {
        }

        [JsiiMethod("visible", null, "[]")]
        public virtual void Visible()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}