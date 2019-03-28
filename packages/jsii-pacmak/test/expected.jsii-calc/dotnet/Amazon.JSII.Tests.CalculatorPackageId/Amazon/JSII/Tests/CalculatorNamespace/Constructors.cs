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

        [JsiiMethod("hiddenInterface", "{\"fqn\":\"jsii-calc.IPublicInterface\"}", "[]")]
        public static IIPublicInterface HiddenInterface()
        {
            return InvokeStaticMethod<IIPublicInterface>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod("hiddenInterfaces", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}", "[]")]
        public static IIPublicInterface[] HiddenInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod("hiddenSubInterfaces", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}", "[]")]
        public static IIPublicInterface[] HiddenSubInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod("makeClass", "{\"fqn\":\"jsii-calc.PublicClass\"}", "[]")]
        public static PublicClass MakeClass()
        {
            return InvokeStaticMethod<PublicClass>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod("makeInterface", "{\"fqn\":\"jsii-calc.IPublicInterface\"}", "[]")]
        public static IIPublicInterface MakeInterface()
        {
            return InvokeStaticMethod<IIPublicInterface>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod("makeInterface2", "{\"fqn\":\"jsii-calc.IPublicInterface2\"}", "[]")]
        public static IIPublicInterface2 MakeInterface2()
        {
            return InvokeStaticMethod<IIPublicInterface2>(typeof(Constructors), new object[]{});
        }

        [JsiiMethod("makeInterfaces", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}", "[]")]
        public static IIPublicInterface[] MakeInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }
    }
}