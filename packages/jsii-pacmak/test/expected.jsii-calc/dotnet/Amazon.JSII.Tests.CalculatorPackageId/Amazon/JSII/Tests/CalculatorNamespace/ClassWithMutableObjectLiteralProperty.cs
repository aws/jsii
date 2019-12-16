using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithMutableObjectLiteralProperty), fullyQualifiedName: "jsii-calc.ClassWithMutableObjectLiteralProperty")]
    public class ClassWithMutableObjectLiteralProperty : DeputyBase
    {
        /// <summary></summary>
        public ClassWithMutableObjectLiteralProperty(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected ClassWithMutableObjectLiteralProperty(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected ClassWithMutableObjectLiteralProperty(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "mutableObject", typeJson: "{\"fqn\":\"jsii-calc.IMutableObjectLiteral\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IMutableObjectLiteral MutableObject
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IMutableObjectLiteral>();
            set => SetInstanceProperty(value);
        }
    }
}
