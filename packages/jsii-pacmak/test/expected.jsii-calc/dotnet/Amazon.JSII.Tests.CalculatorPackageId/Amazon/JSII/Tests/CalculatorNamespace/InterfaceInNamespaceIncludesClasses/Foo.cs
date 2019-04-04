using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceIncludesClasses
{
    [JsiiClass(typeof(Foo), "jsii-calc.InterfaceInNamespaceIncludesClasses.Foo", "[]")]
    public class Foo : DeputyBase
    {
        public Foo(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Foo(ByRefValue reference): base(reference)
        {
        }

        protected Foo(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("bar", "{\"primitive\":\"string\",\"nullable\":true}")]
        public virtual string Bar
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}