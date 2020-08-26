using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.PythonSelf
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.ClassWithSelf), fullyQualifiedName: "jsii-calc.PythonSelf.ClassWithSelf", parametersJson: "[{\"name\":\"self\",\"type\":{\"primitive\":\"string\"}}]")]
    public class ClassWithSelf : DeputyBase
    {
        public ClassWithSelf(string self): base(new DeputyProps(new object[]{self}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithSelf(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithSelf(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "method", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"self\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual string Method(double self)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(double)}, new object[]{self});
        }

        [JsiiProperty(name: "self", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Self
        {
            get => GetInstanceProperty<string>();
        }
    }
}
