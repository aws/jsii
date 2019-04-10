using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(ClassWithMutableObjectLiteralProperty), fullyQualifiedName: "jsii-calc.ClassWithMutableObjectLiteralProperty")]
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

        [JsiiProperty(name: "mutableObject", typeJson: "{\"fqn\":\"jsii-calc.IMutableObjectLiteral\"}")]
        public virtual IIMutableObjectLiteral MutableObject
        {
            get => GetInstanceProperty<IIMutableObjectLiteral>();
            set => SetInstanceProperty(value);
        }
    }
}