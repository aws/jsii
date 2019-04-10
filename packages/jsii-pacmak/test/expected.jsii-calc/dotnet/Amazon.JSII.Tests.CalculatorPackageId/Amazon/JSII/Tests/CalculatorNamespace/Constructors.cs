using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(Constructors), "jsii-calc.Constructors", "[]")]
    public class Constructors : DeputyBase
    {
        public Constructors(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Constructors(ByRefValue reference): base(reference)
        {
        }

        protected Constructors(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "hiddenInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}", parametersJson: "[]")]
        public static IIPublicInterface HiddenInterface()
        {
            return InvokeStaticMethod<IIPublicInterface>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod(name: "hiddenInterfaces", returnsJson: "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}}", parametersJson: "[]")]
        public static IIPublicInterface[] HiddenInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod(name: "hiddenSubInterfaces", returnsJson: "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}}", parametersJson: "[]")]
        public static IIPublicInterface[] HiddenSubInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod(name: "makeClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.PublicClass\"}}", parametersJson: "[]")]
        public static PublicClass MakeClass()
        {
            return InvokeStaticMethod<PublicClass>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod(name: "makeInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}", parametersJson: "[]")]
        public static IIPublicInterface MakeInterface()
        {
            return InvokeStaticMethod<IIPublicInterface>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod(name: "makeInterface2", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface2\"}}", parametersJson: "[]")]
        public static IIPublicInterface2 MakeInterface2()
        {
            return InvokeStaticMethod<IIPublicInterface2>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod(name: "makeInterfaces", returnsJson: "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}}", parametersJson: "[]")]
        public static IIPublicInterface[] MakeInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }
    }
}