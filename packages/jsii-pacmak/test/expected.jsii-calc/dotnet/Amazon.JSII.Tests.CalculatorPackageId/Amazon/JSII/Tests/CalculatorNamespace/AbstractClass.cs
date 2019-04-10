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

        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiMethod(name: "abstractMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public abstract string AbstractMethod(string name);
        [JsiiMethod(name: "nonAbstractMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[]")]
        public virtual double NonAbstractMethod()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}