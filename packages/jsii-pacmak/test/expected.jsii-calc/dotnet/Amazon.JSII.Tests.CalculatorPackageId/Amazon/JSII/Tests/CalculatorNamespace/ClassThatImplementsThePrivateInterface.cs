using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ClassThatImplementsThePrivateInterface), "jsii-calc.ClassThatImplementsThePrivateInterface", "[]")]
    public class ClassThatImplementsThePrivateInterface : DeputyBase, IINonInternalInterface
    {
        public ClassThatImplementsThePrivateInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ClassThatImplementsThePrivateInterface(ByRefValue reference): base(reference)
        {
        }

        protected ClassThatImplementsThePrivateInterface(DeputyProps props): base(props)
        {
        }

        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string B
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "c", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string C
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "e", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string E
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}