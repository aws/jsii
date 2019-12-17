using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithJavaReservedWords), fullyQualifiedName: "jsii-calc.ClassWithJavaReservedWords", parametersJson: "[{\"name\":\"int\",\"type\":{\"primitive\":\"string\"}}]")]
    public class ClassWithJavaReservedWords : DeputyBase
    {
        /// <summary></summary>
        /// <param name="int"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public ClassWithJavaReservedWords(string @int): base(new DeputyProps(new object[]{@int}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected ClassWithJavaReservedWords(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected ClassWithJavaReservedWords(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="assert"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "import", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"assert\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string Import(string assert)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string)}, new object[]{assert});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "int", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Int
        {
            get => GetInstanceProperty<string>();
        }
    }
}
