using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(AbstractClass), "jsii-calc.AbstractClass", "[]")]
    public abstract class AbstractClass : AbstractClassBase, IIInterfaceImplementedByAbstractClass
    {
        protected AbstractClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AbstractClass(ByRefValue reference): base(reference)
        {
        }

        protected AbstractClass(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("propFromInterface", "{\"primitive\":\"string\"}")]
        public virtual string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiMethod("abstractMethod", "{\"primitive\":\"string\"}", "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public abstract string AbstractMethod(string name);
        [JsiiMethod("nonAbstractMethod", "{\"primitive\":\"number\"}", "[]")]
        public virtual double NonAbstractMethod()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}