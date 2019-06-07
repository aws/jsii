using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This class has docs.</summary>
    /// <remarks>
    /// The docs are great. They're a bunch of tags.
    /// deprecated: Use something else please
    /// stability: stable
    /// example:
    /// <code>
    /// function anExample() {
    /// }
    /// </code>
    /// https://aws.amazon.com/
    /// customAttribute: hasAValue
    /// </remarks>
    [JsiiClass(nativeType: typeof(ClassWithDocs), fullyQualifiedName: "jsii-calc.ClassWithDocs")]
    public class ClassWithDocs : DeputyBase
    {
        public ClassWithDocs(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ClassWithDocs(ByRefValue reference): base(reference)
        {
        }

        protected ClassWithDocs(DeputyProps props): base(props)
        {
        }
    }
}
