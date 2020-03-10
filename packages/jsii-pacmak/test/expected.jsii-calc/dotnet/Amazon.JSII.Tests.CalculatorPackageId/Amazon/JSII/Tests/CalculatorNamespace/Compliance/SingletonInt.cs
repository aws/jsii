using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Verifies that singleton enums are handled correctly.</summary>
    /// <remarks>
    /// https://github.com/aws/jsii/issues/231
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.SingletonInt), fullyQualifiedName: "jsii-calc.compliance.SingletonInt")]
    public class SingletonInt : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected SingletonInt(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected SingletonInt(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "isSingletonInt", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual bool IsSingletonInt(double @value)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(double)}, new object[]{@value});
        }
    }
}
