using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class NullShouldBeTreatedAsUndefinedData : INullShouldBeTreatedAsUndefinedData
    {
        [JsiiProperty("arrayWithThreeElementsAndUndefinedAsSecondArgument", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"any\"},\"optional\":true}}}}", true)]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
            set;
        }

        [JsiiProperty("thisShouldBeUndefined", "{\"type\":{\"primitive\":\"any\"},\"optional\":true}", true)]
        public object ThisShouldBeUndefined
        {
            get;
            set;
        }
    }
}