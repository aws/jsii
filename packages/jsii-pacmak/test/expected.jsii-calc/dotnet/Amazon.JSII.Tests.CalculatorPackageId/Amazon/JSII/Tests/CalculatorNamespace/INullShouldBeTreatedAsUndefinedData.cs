using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(INullShouldBeTreatedAsUndefinedData), "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    public interface INullShouldBeTreatedAsUndefinedData
    {
        [JsiiProperty("arrayWithThreeElementsAndUndefinedAsSecondArgument", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"any\"},\"optional\":true}}}}")]
        object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
        }

        [JsiiProperty("thisShouldBeUndefined", "{\"type\":{\"primitive\":\"any\"},\"optional\":true}")]
        object ThisShouldBeUndefined
        {
            get;
        }
    }
}