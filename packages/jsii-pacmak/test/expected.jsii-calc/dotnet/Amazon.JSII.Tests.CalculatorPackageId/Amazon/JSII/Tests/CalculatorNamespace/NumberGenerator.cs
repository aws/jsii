using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This allows us to test that a reference can be stored for objects that implement interfaces.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.NumberGenerator), fullyQualifiedName: "jsii-calc.NumberGenerator", parametersJson: "[{\"name\":\"generator\",\"type\":{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}}]")]
    public class NumberGenerator : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public NumberGenerator(Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator generator): base(new DeputyProps(new object[]{generator}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected NumberGenerator(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected NumberGenerator(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "isSameGenerator", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"gen\",\"type\":{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}}]")]
        public virtual bool IsSameGenerator(Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator gen)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator)}, new object[]{gen});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "nextTimes100", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NextTimes100()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "generator", typeJson: "{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator Generator
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IRandomNumberGenerator>();
            set => SetInstanceProperty(value);
        }
    }
}
