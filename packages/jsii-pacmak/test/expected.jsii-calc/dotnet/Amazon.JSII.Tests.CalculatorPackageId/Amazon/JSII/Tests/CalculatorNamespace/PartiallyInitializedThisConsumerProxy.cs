using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(PartiallyInitializedThisConsumer), fullyQualifiedName: "jsii-calc.PartiallyInitializedThisConsumer")]
    internal sealed class PartiallyInitializedThisConsumerProxy : PartiallyInitializedThisConsumer
    {
        private PartiallyInitializedThisConsumerProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "consumePartiallyInitializedThis", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.ConstructorPassesThisOut\"}},{\"name\":\"dt\",\"type\":{\"primitive\":\"date\"}},{\"name\":\"ev\",\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}]")]
        public override string ConsumePartiallyInitializedThis(Amazon.JSII.Tests.CalculatorNamespace.ConstructorPassesThisOut obj, System.DateTime dt, Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum ev)
        {
            return InvokeInstanceMethod<string>(new object[]{obj, dt, ev});
        }
    }
}
