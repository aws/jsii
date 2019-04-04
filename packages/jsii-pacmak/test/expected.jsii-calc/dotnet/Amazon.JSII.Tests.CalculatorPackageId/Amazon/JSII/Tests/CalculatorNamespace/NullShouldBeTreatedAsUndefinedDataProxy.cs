using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(INullShouldBeTreatedAsUndefinedData), "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    internal sealed class NullShouldBeTreatedAsUndefinedDataProxy : DeputyBase, INullShouldBeTreatedAsUndefinedData
    {
        private NullShouldBeTreatedAsUndefinedDataProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("arrayWithThreeElementsAndUndefinedAsSecondArgument", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\",\"nullable\":true}}}")]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get => GetInstanceProperty<object[]>();
        }

        [JsiiProperty("thisShouldBeUndefined", "{\"primitive\":\"any\",\"nullable\":true}")]
        public object ThisShouldBeUndefined
        {
            get => GetInstanceProperty<object>();
        }
    }
}