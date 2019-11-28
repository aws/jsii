using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithMutableObjectLiteralProperty), fullyQualifiedName: "jsii-calc.ClassWithMutableObjectLiteralProperty")]
    public class ClassWithMutableObjectLiteralProperty : DeputyBase
    {
        public ClassWithMutableObjectLiteralProperty(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithMutableObjectLiteralProperty(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithMutableObjectLiteralProperty(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "mutableObject", typeJson: "{\"fqn\":\"jsii-calc.IMutableObjectLiteral\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IMutableObjectLiteral MutableObject
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IMutableObjectLiteral>();
            set => SetInstanceProperty(value);
        }
    }
}
