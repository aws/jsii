using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
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

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "hiddenInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface HiddenInterface()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface>(typeof(Constructors), new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "hiddenInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"},\"kind\":\"array\"}}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface[] HiddenInterfaces()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "hiddenSubInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"},\"kind\":\"array\"}}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface[] HiddenSubInterfaces()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "makeClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.PublicClass\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.PublicClass MakeClass()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.PublicClass>(typeof(Constructors), new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "makeInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface MakeInterface()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface>(typeof(Constructors), new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "makeInterface2", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IPublicInterface2\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface2 MakeInterface2()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface2>(typeof(Constructors), new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "makeInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.IPublicInterface\"},\"kind\":\"array\"}}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface[] MakeInterfaces()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IIPublicInterface[]>(typeof(Constructors), new object[]{});
        }
    }
}
