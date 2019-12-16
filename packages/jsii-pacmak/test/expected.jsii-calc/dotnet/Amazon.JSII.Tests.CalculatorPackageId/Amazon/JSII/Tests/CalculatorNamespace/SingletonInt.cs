using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that singleton enums are handled correctly.</summary>
    /// <remarks>
    /// https://github.com/aws/jsii/issues/231
    /// 
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SingletonInt), fullyQualifiedName: "jsii-calc.SingletonInt")]
    public class SingletonInt : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected SingletonInt(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected SingletonInt(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="value"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "isSingletonInt", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual bool IsSingletonInt(double @value)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(double)}, new object[]{@value});
        }
    }
}
