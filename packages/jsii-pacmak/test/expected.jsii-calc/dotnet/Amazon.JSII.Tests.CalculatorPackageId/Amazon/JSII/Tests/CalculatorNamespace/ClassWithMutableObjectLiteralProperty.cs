using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ClassWithMutableObjectLiteralProperty), "jsii-calc.ClassWithMutableObjectLiteralProperty", "[]")]
    public class ClassWithMutableObjectLiteralProperty : DeputyBase
    {
        public ClassWithMutableObjectLiteralProperty(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ClassWithMutableObjectLiteralProperty(ByRefValue reference): base(reference)
        {
        }

        protected ClassWithMutableObjectLiteralProperty(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("mutableObject", "{\"fqn\":\"jsii-calc.MutableObjectLiteral\"}")]
        public virtual IMutableObjectLiteral MutableObject
        {
            get => GetInstanceProperty<IMutableObjectLiteral>();
            set => SetInstanceProperty(value);
        }
    }
}