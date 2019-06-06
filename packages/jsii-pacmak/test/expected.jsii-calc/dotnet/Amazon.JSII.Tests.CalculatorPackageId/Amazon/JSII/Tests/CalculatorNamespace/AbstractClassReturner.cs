using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
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

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "returnAbstractFromProperty", typeJson: "{\"fqn\":\"jsii-calc.AbstractClassBase\"}")]
        public virtual AbstractClassBase ReturnAbstractFromProperty
        {
            get => GetInstanceProperty<AbstractClassBase>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "giveMeAbstract", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.AbstractClass\"}}")]
        public virtual AbstractClass GiveMeAbstract()
        {
            return InvokeInstanceMethod<AbstractClass>(new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "giveMeInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IInterfaceImplementedByAbstractClass\"}}")]
        public virtual IIInterfaceImplementedByAbstractClass GiveMeInterface()
        {
            return InvokeInstanceMethod<IIInterfaceImplementedByAbstractClass>(new object[]{});
        }
    }
}