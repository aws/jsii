using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This class has docs.</summary>
    /// <remarks>
    /// The docs are great. They're a bunch of tags.
    /// 
<<<<<<< HEAD
    /// <strong>Stability</strong>: Stable
    /// 
    /// <strong>See</strong>: https://aws.amazon.com/
    /// 
    /// <strong>CustomAttribute</strong>: hasAValue
    /// </remarks>
    /// <example>
=======
    /// stability: Stable
    /// 
    /// example:
>>>>>>> origin/master
    /// <code>
    /// // Example automatically generated. See https://github.com/aws/jsii/issues/826
    /// public void AnExample()
    /// {
    /// }
    /// </code>
<<<<<<< HEAD
    /// </example>
=======
    /// 
    /// see:
    /// https://aws.amazon.com/
    /// 
    /// customAttribute: hasAValue
    /// </remarks>
>>>>>>> origin/master
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithDocs), fullyQualifiedName: "jsii-calc.ClassWithDocs")]
    public class ClassWithDocs : DeputyBase
    {
        /// <summary></summary>
        public ClassWithDocs(): base(new DeputyProps(new object[]{}))
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected ClassWithDocs(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected ClassWithDocs(DeputyProps props): base(props)
        {
        }
    }
}
