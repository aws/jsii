using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    public class NullShouldBeTreatedAsUndefinedData : DeputyBase, INullShouldBeTreatedAsUndefinedData
    {
        [JsiiProperty("arrayWithThreeElementsAndUndefinedAsSecondArgument", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\",\"optional\":true}}}", true)]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
            set;
        }

        [JsiiProperty("thisShouldBeUndefined", "{\"primitive\":\"any\",\"optional\":true}", true)]
        public object ThisShouldBeUndefined
        {
            get;
            set;
        }
    }
}