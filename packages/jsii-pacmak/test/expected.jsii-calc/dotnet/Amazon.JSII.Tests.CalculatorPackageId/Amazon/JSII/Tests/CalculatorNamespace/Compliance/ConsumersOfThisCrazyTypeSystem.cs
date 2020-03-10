using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConsumersOfThisCrazyTypeSystem), fullyQualifiedName: "jsii-calc.compliance.ConsumersOfThisCrazyTypeSystem")]
    public class ConsumersOfThisCrazyTypeSystem : DeputyBase
    {
        public ConsumersOfThisCrazyTypeSystem(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConsumersOfThisCrazyTypeSystem(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConsumersOfThisCrazyTypeSystem(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "consumeAnotherPublicInterface", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.compliance.IAnotherPublicInterface\"}}]")]
        public virtual string ConsumeAnotherPublicInterface(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnotherPublicInterface obj)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnotherPublicInterface)}, new object[]{obj});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "consumeNonInternalInterface", returnsJson: "{\"type\":{\"primitive\":\"any\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.compliance.INonInternalInterface\"}}]")]
        public virtual object ConsumeNonInternalInterface(Amazon.JSII.Tests.CalculatorNamespace.Compliance.INonInternalInterface obj)
        {
            return InvokeInstanceMethod<object>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.INonInternalInterface)}, new object[]{obj});
        }
    }
}
