using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.MethodNamedProperty), fullyQualifiedName: "jsii-calc.MethodNamedProperty")]
    public class MethodNamedProperty : DeputyBase
    {
        /// <summary></summary>
        public MethodNamedProperty(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected MethodNamedProperty(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected MethodNamedProperty(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "property", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string Property()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "elite", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Elite
        {
            get => GetInstanceProperty<double>();
        }
    }
}
