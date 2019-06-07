using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(AbstractClassReturner), fullyQualifiedName: "jsii-calc.AbstractClassReturner")]
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

        [JsiiMethod(name: "giveMeAbstract", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.AbstractClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.AbstractClass GiveMeAbstract()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.AbstractClass>(new object[]{});
        }

        [JsiiMethod(name: "giveMeInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IInterfaceImplementedByAbstractClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceImplementedByAbstractClass GiveMeInterface()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceImplementedByAbstractClass>(new object[]{});
        }

        [JsiiProperty(name: "returnAbstractFromProperty", typeJson: "{\"fqn\":\"jsii-calc.AbstractClassBase\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.AbstractClassBase ReturnAbstractFromProperty
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.AbstractClassBase>();
        }
    }
}
