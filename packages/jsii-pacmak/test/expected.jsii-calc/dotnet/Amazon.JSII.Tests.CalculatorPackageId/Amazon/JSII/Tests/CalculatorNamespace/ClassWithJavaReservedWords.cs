using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithJavaReservedWords), fullyQualifiedName: "jsii-calc.ClassWithJavaReservedWords", parametersJson: "[{\"name\":\"int\",\"type\":{\"primitive\":\"string\"}}]")]
    public class ClassWithJavaReservedWords : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public ClassWithJavaReservedWords(string @int): base(new DeputyProps(new object[]{@int}))
        {
        }

        protected ClassWithJavaReservedWords(ByRefValue reference): base(reference)
        {
        }

        protected ClassWithJavaReservedWords(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "import", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"assert\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string Import(string assert)
        {
            return InvokeInstanceMethod<string>(new object[]{assert});
        }

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
