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
        /// <summary></summary>
        /// <param name="generator"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public NumberGenerator(Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator generator): base(new DeputyProps(new object[]{generator}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected NumberGenerator(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected NumberGenerator(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="gen"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "isSameGenerator", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"gen\",\"type\":{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}}]")]
        public virtual bool IsSameGenerator(Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator gen)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator)}, new object[]{gen});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "nextTimes100", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NextTimes100()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "generator", typeJson: "{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator Generator
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator>();
            set => SetInstanceProperty(value);
        }
    }
}
