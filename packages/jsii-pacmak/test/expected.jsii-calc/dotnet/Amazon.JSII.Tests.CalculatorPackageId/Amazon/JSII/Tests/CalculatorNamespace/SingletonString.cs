using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that singleton enums are handled correctly.</summary>
    /// <remarks>
    /// https://github.com/awslabs/jsii/issues/231
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(SingletonString), fullyQualifiedName: "jsii-calc.SingletonString")]
    public class SingletonString : DeputyBase
    {
        protected SingletonString(ByRefValue reference): base(reference)
        {
        }

        protected SingletonString(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "isSingletonString", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual bool IsSingletonString(string @value)
        {
            return InvokeInstanceMethod<bool>(new object[]{@value});
        }
    }
}
