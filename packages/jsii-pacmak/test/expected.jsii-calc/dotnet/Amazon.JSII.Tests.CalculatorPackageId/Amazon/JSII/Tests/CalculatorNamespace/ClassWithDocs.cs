using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This class has docs.</summary>
    /// <remarks>
    /// The docs are great. They're a bunch of tags.
    /// 
    /// stability: Stable
    /// 
    /// example:
    /// <code>
    /// // Examples in C# are coming soon.
    /// function anExample() {
    /// }
    /// </code>
    /// 
    /// see:
    /// https://aws.amazon.com/
    /// 
    /// customAttribute: hasAValue
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithDocs), fullyQualifiedName: "jsii-calc.ClassWithDocs")]
    public class ClassWithDocs : DeputyBase
    {
        /// <summary></summary>
        public ClassWithDocs(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected ClassWithDocs(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected ClassWithDocs(DeputyProps props): base(props)
        {
        }
    }
}
