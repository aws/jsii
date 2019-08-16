using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(INullShouldBeTreatedAsUndefinedData), fullyQualifiedName: "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    internal sealed class NullShouldBeTreatedAsUndefinedDataProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.INullShouldBeTreatedAsUndefinedData
    {
        private NullShouldBeTreatedAsUndefinedDataProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "arrayWithThreeElementsAndUndefinedAsSecondArgument", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"array\"}}")]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get => GetInstanceProperty<object[]>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "thisShouldBeUndefined", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        [JsiiOptional]
        public object ThisShouldBeUndefined
        {
            get => GetInstanceProperty<object>();
        }
    }
}
