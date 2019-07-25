using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithMutableObjectLiteralProperty), fullyQualifiedName: "jsii-calc.ClassWithMutableObjectLiteralProperty")]
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

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "mutableObject", typeJson: "{\"fqn\":\"jsii-calc.IMutableObjectLiteral\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IIMutableObjectLiteral MutableObject
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IIMutableObjectLiteral>();
            set => SetInstanceProperty(value);
        }
    }
}
