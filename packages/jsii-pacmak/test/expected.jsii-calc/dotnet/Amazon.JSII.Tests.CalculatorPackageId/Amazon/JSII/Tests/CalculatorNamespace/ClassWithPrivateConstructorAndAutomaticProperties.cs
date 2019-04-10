using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Class that implements interface properties automatically, but using a private constructor.</summary>
    [JsiiClass(typeof(ClassWithPrivateConstructorAndAutomaticProperties), "jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties", "[]")]
    public class ClassWithPrivateConstructorAndAutomaticProperties : DeputyBase, IIInterfaceWithProperties
    {
        protected ClassWithPrivateConstructorAndAutomaticProperties(ByRefValue reference): base(reference)
        {
        }

        protected ClassWithPrivateConstructorAndAutomaticProperties(DeputyProps props): base(props)
        {
        }

        [JsiiProperty(name: "readOnlyString", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadOnlyString
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "readWriteString", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadWriteString
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod(name: "create", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties\"}}", parametersJson: "[{\"name\":\"readOnlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"readWriteString\",\"type\":{\"primitive\":\"string\"}}]")]
        public static ClassWithPrivateConstructorAndAutomaticProperties Create(string readOnlyString, string readWriteString)
        {
            return InvokeStaticMethod<ClassWithPrivateConstructorAndAutomaticProperties>(typeof(ClassWithPrivateConstructorAndAutomaticProperties), new object[]{readOnlyString, readWriteString});
        }
    }
}