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
    }
}