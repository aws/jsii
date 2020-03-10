using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.PartiallyInitializedThisConsumer), fullyQualifiedName: "jsii-calc.compliance.PartiallyInitializedThisConsumer")]
    internal sealed class PartiallyInitializedThisConsumerProxy : Amazon.JSII.Tests.CalculatorNamespace.Compliance.PartiallyInitializedThisConsumer
    {
        private PartiallyInitializedThisConsumerProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "consumePartiallyInitializedThis", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.compliance.ConstructorPassesThisOut\"}},{\"name\":\"dt\",\"type\":{\"primitive\":\"date\"}},{\"name\":\"ev\",\"type\":{\"fqn\":\"jsii-calc.compliance.AllTypesEnum\"}}]")]
        public override string ConsumePartiallyInitializedThis(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConstructorPassesThisOut obj, System.DateTime dt, Amazon.JSII.Tests.CalculatorNamespace.Compliance.AllTypesEnum ev)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConstructorPassesThisOut), typeof(System.DateTime), typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.AllTypesEnum)}, new object[]{obj, dt, ev});
        }
    }
}
