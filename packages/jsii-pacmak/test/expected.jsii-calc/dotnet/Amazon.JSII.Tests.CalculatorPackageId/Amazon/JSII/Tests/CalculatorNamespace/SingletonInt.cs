using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that singleton enums are handled correctly.</summary>
    /// <remarks>
    /// https://github.com/aws/jsii/issues/231
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(SingletonInt), fullyQualifiedName: "jsii-calc.SingletonInt")]
    public class SingletonInt : DeputyBase
    {
        protected SingletonInt(ByRefValue reference): base(reference)
        {
        }

        protected SingletonInt(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "isSingletonInt", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual bool IsSingletonInt(double @value)
        {
            return InvokeInstanceMethod<bool>(new object[]{@value});
        }
    }
}
