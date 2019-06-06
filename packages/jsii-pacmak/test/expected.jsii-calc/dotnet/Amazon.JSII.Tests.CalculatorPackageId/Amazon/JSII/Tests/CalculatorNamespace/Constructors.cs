using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(Constructors), fullyQualifiedName: "jsii-calc.Constructors")]
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

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "hiddenInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}")]
        public static IIPublicInterface HiddenInterface()
        {
            return InvokeStaticMethod<IIPublicInterface>(typeof(Constructors), new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "hiddenInterfaces", returnsJson: "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}}")]
        public static IIPublicInterface[] HiddenInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "hiddenSubInterfaces", returnsJson: "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}}")]
        public static IIPublicInterface[] HiddenSubInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "makeClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.PublicClass\"}}")]
        public static PublicClass MakeClass()
        {
            return InvokeStaticMethod<PublicClass>(typeof(Constructors), new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "makeInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}")]
        public static IIPublicInterface MakeInterface()
        {
            return InvokeStaticMethod<IIPublicInterface>(typeof(Constructors), new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "makeInterface2", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface2\"}}")]
        public static IIPublicInterface2 MakeInterface2()
        {
            return InvokeStaticMethod<IIPublicInterface2>(typeof(Constructors), new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "makeInterfaces", returnsJson: "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}}}")]
        public static IIPublicInterface[] MakeInterfaces()
        {
            return InvokeStaticMethod<IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }
    }
}