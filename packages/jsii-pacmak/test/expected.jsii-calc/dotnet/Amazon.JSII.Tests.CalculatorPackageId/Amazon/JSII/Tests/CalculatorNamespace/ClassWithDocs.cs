using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This class has docs.</summary>
    /// <remarks>
    /// The docs are great. They're a bunch of tags.
    /// 
    /// <strong>Stability</strong>: Stable
    /// 
    /// <strong>See</strong>: https://aws.amazon.com/
    /// 
    /// <strong>CustomAttribute</strong>: hasAValue
    /// </remarks>
    /// <example>
    /// <code>// Example automatically generated. See https://github.com/aws/jsii/issues/826
    /// public void AnExample()
    /// {
    /// }</code>
    /// </example>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithDocs), fullyQualifiedName: "jsii-calc.ClassWithDocs")]
    public class ClassWithDocs : DeputyBase
    {
        public ClassWithDocs(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithDocs(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithDocs(DeputyProps props): base(props)
        {
        }
    }
}
