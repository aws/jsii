using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class NullShouldBeTreatedAsUndefinedData : INullShouldBeTreatedAsUndefinedData
    {
        [JsiiProperty("arrayWithThreeElementsAndUndefinedAsSecondArgument", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\",\"nullable\":true}}}", true)]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
            set;
        }

        [JsiiProperty("thisShouldBeUndefined", "{\"primitive\":\"any\",\"nullable\":true}", true)]
        public object ThisShouldBeUndefined
        {
            get;
            set;
        }
    }
}