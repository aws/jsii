using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(AbstractClass), fullyQualifiedName: "jsii-calc.AbstractClass")]
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

        [JsiiMethod(name: "abstractMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public abstract string AbstractMethod(string name);


        [JsiiMethod(name: "nonAbstractMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NonAbstractMethod()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }
    }
}
