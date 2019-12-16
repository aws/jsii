using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumersOfThisCrazyTypeSystem), fullyQualifiedName: "jsii-calc.ConsumersOfThisCrazyTypeSystem")]
    public class ConsumersOfThisCrazyTypeSystem : DeputyBase
    {
        /// <summary></summary>
        public ConsumersOfThisCrazyTypeSystem(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected ConsumersOfThisCrazyTypeSystem(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected ConsumersOfThisCrazyTypeSystem(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="obj"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "consumeAnotherPublicInterface", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IAnotherPublicInterface\"}}]")]
        public virtual string ConsumeAnotherPublicInterface(Amazon.JSII.Tests.CalculatorNamespace.IAnotherPublicInterface obj)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IAnotherPublicInterface)}, new object[]{obj});
        }

        /// <summary></summary>
        /// <param name="obj"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "consumeNonInternalInterface", returnsJson: "{\"type\":{\"primitive\":\"any\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.INonInternalInterface\"}}]")]
        public virtual object ConsumeNonInternalInterface(Amazon.JSII.Tests.CalculatorNamespace.INonInternalInterface obj)
        {
            return InvokeInstanceMethod<object>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.INonInternalInterface)}, new object[]{obj});
        }
    }
}
