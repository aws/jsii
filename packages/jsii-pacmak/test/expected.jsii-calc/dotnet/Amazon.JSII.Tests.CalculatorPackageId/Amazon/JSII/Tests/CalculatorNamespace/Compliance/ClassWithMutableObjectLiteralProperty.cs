using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ClassWithMutableObjectLiteralProperty), fullyQualifiedName: "jsii-calc.compliance.ClassWithMutableObjectLiteralProperty")]
    public class ClassWithMutableObjectLiteralProperty : DeputyBase
    {
        public ClassWithMutableObjectLiteralProperty(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithMutableObjectLiteralProperty(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithMutableObjectLiteralProperty(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "mutableObject", typeJson: "{\"fqn\":\"jsii-calc.compliance.IMutableObjectLiteral\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.IMutableObjectLiteral MutableObject
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IMutableObjectLiteral>();
            set => SetInstanceProperty(value);
        }
    }
}
