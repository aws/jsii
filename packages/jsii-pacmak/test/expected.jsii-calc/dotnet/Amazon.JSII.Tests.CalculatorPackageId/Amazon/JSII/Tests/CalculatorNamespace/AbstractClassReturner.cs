using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(AbstractClassReturner), "jsii-calc.AbstractClassReturner", "[]")]
    public class AbstractClassReturner : DeputyBase
    {
        public AbstractClassReturner(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AbstractClassReturner(ByRefValue reference): base(reference)
        {
        }

        protected AbstractClassReturner(DeputyProps props): base(props)
        {
        }

        [JsiiProperty(name: "returnAbstractFromProperty", typeJson: "{\"fqn\":\"jsii-calc.AbstractClassBase\"}")]
        public virtual AbstractClassBase ReturnAbstractFromProperty
        {
            get => GetInstanceProperty<AbstractClassBase>();
        }

        [JsiiMethod(name: "giveMeAbstract", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.AbstractClass\"}}", parametersJson: "[]")]
        public virtual AbstractClass GiveMeAbstract()
        {
            return InvokeInstanceMethod<AbstractClass>(new object[]{});
        }

        [JsiiMethod(name: "giveMeInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IInterfaceImplementedByAbstractClass\"}}", parametersJson: "[]")]
        public virtual IIInterfaceImplementedByAbstractClass GiveMeInterface()
        {
            return InvokeInstanceMethod<IIInterfaceImplementedByAbstractClass>(new object[]{});
        }
    }
}