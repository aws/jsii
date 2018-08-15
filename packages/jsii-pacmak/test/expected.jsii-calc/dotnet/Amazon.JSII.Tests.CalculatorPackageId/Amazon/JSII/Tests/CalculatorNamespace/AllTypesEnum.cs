using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiEnum(typeof(AllTypesEnum), "jsii-calc.AllTypesEnum")]
    public enum AllTypesEnum
    {
        [JsiiEnumMember("MyEnumValue")]
        MyEnumValue,
        [JsiiEnumMember("YourEnumValue")]
        YourEnumValue,
        [JsiiEnumMember("ThisIsGreat")]
        ThisIsGreat
    }
}