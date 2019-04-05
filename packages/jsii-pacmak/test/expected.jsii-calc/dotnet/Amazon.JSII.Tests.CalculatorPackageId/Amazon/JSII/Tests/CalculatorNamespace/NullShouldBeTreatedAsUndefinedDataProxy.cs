using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(INullShouldBeTreatedAsUndefinedData), "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    internal sealed class NullShouldBeTreatedAsUndefinedDataProxy : DeputyBase, INullShouldBeTreatedAsUndefinedData
    {
        private NullShouldBeTreatedAsUndefinedDataProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("arrayWithThreeElementsAndUndefinedAsSecondArgument", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"any\"},\"optional\":true}}}}")]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get => GetInstanceProperty<object[]>();
        }

        [JsiiProperty("thisShouldBeUndefined", "{\"type\":{\"primitive\":\"any\"},\"optional\":true}")]
        public object ThisShouldBeUndefined
        {
            get => GetInstanceProperty<object>();
        }
    }
}