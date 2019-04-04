using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(INullShouldBeTreatedAsUndefinedData), "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    public interface INullShouldBeTreatedAsUndefinedData
    {
        [JsiiProperty("arrayWithThreeElementsAndUndefinedAsSecondArgument", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\",\"nullable\":true}}}")]
        object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
        }

        [JsiiProperty("thisShouldBeUndefined", "{\"primitive\":\"any\",\"nullable\":true}")]
        object ThisShouldBeUndefined
        {
            get;
        }
    }
}