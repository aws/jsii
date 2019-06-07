using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(INullShouldBeTreatedAsUndefinedData), fullyQualifiedName: "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    public interface INullShouldBeTreatedAsUndefinedData
    {
        [JsiiProperty(name: "arrayWithThreeElementsAndUndefinedAsSecondArgument", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"array\"}}")]
        object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
        }

        [JsiiProperty(name: "thisShouldBeUndefined", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        object ThisShouldBeUndefined
        {
            get;
        }
    }
}
