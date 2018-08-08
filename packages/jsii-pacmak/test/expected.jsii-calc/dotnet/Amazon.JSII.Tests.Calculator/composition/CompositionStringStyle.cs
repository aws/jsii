using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.composition
{
    /// <summary>Style of .toString() output for CompositeOperation.</summary>
    [JsiiEnum(typeof(CompositionStringStyle), "jsii-calc.composition.CompositionStringStyle")]
    public enum CompositionStringStyle
    {
        [JsiiEnumMember("Normal")]
        Normal,
        [JsiiEnumMember("Decorated")]
        Decorated
    }
}