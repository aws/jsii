using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This allows us to test that a reference can be stored for objects that implement interfaces.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.NumberGenerator), fullyQualifiedName: "jsii-calc.NumberGenerator", parametersJson: "[{\"name\":\"generator\",\"type\":{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}}]")]
    public class NumberGenerator : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public NumberGenerator(Amazon.JSII.Tests.CalculatorNamespace.IIRandomNumberGenerator generator): base(new DeputyProps(new object[]{generator}))
        {
        }

        protected NumberGenerator(ByRefValue reference): base(reference)
        {
        }

        protected NumberGenerator(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "isSameGenerator", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"gen\",\"type\":{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}}]")]
        public virtual bool IsSameGenerator(Amazon.JSII.Tests.CalculatorNamespace.IIRandomNumberGenerator gen)
        {
            return InvokeInstanceMethod<bool>(new object[]{gen});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "nextTimes100", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NextTimes100()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "generator", typeJson: "{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IIRandomNumberGenerator Generator
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IIRandomNumberGenerator>();
            set => SetInstanceProperty(value);
        }
    }
}
