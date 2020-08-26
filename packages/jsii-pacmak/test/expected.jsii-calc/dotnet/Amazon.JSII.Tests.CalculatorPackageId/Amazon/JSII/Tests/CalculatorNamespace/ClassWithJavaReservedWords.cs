using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithJavaReservedWords), fullyQualifiedName: "jsii-calc.ClassWithJavaReservedWords", parametersJson: "[{\"name\":\"int\",\"type\":{\"primitive\":\"string\"}}]")]
    public class ClassWithJavaReservedWords : DeputyBase
    {
        public ClassWithJavaReservedWords(string @int): base(new DeputyProps(new object[]{@int}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithJavaReservedWords(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithJavaReservedWords(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "import", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"assert\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string Import(string assert)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string)}, new object[]{assert});
        }

        [JsiiProperty(name: "int", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Int
        {
            get => GetInstanceProperty<string>();
        }
    }
}
