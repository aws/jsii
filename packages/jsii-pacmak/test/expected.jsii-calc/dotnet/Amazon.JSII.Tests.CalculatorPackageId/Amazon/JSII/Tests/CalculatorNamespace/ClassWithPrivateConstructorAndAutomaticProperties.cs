using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Class that implements interface properties automatically, but using a private constructor</summary>
    [JsiiClass(typeof(ClassWithPrivateConstructorAndAutomaticProperties), "jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties", "[]")]
    public class ClassWithPrivateConstructorAndAutomaticProperties : DeputyBase, IIInterfaceWithProperties
    {
        protected ClassWithPrivateConstructorAndAutomaticProperties(ByRefValue reference): base(reference)
        {
        }

        protected ClassWithPrivateConstructorAndAutomaticProperties(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("readOnlyString", "{\"primitive\":\"string\"}")]
        public virtual string ReadOnlyString
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("readWriteString", "{\"primitive\":\"string\"}")]
        public virtual string ReadWriteString
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod("create", "{\"fqn\":\"jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties\"}", "[{\"name\":\"readOnlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"readWriteString\",\"type\":{\"primitive\":\"string\"}}]")]
        public static ClassWithPrivateConstructorAndAutomaticProperties Create(string readOnlyString, string readWriteString)
        {
            return InvokeStaticMethod<ClassWithPrivateConstructorAndAutomaticProperties>(typeof(ClassWithPrivateConstructorAndAutomaticProperties), new object[]{readOnlyString, readWriteString});
        }
    }
}