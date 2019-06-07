using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(INullShouldBeTreatedAsUndefinedData), fullyQualifiedName: "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    internal sealed class NullShouldBeTreatedAsUndefinedDataProxy : DeputyBase, INullShouldBeTreatedAsUndefinedData
    {
        private NullShouldBeTreatedAsUndefinedDataProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "arrayWithThreeElementsAndUndefinedAsSecondArgument", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"array\"}}")]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get => GetInstanceProperty<object[]>();
        }

        [JsiiProperty(name: "thisShouldBeUndefined", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        public object ThisShouldBeUndefined
        {
            get => GetInstanceProperty<object>();
        }
    }
}
