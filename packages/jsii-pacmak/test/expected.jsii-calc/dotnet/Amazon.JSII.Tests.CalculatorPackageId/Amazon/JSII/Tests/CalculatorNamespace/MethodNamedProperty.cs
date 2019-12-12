using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.MethodNamedProperty), fullyQualifiedName: "jsii-calc.MethodNamedProperty")]
    public class MethodNamedProperty : DeputyBase
    {
        public MethodNamedProperty(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MethodNamedProperty(ByRefValue reference): base(reference)
        {
        }

        protected MethodNamedProperty(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "property", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string Property()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

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
