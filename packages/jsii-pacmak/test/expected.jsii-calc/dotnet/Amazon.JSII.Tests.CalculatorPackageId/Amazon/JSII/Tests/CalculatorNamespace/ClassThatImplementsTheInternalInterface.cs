using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ClassThatImplementsTheInternalInterface), "jsii-calc.ClassThatImplementsTheInternalInterface", "[]")]
    public class ClassThatImplementsTheInternalInterface : DeputyBase, IINonInternalInterface
    {
        public ClassThatImplementsTheInternalInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ClassThatImplementsTheInternalInterface(ByRefValue reference): base(reference)
        {
        }

        protected ClassThatImplementsTheInternalInterface(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("a", "{\"primitive\":\"string\"}")]
        public virtual string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("b", "{\"primitive\":\"string\"}")]
        public virtual string B
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("c", "{\"primitive\":\"string\"}")]
        public virtual string C
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("d", "{\"primitive\":\"string\"}")]
        public virtual string D
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}