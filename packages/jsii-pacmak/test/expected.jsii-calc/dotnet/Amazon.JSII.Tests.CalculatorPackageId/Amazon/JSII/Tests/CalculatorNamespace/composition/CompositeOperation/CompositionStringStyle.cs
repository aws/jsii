using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation
{
    /// <summary>Style of .toString() output for CompositeOperation.</summary>
    [JsiiEnum(typeof(CompositionStringStyle), "jsii-calc.composition.CompositeOperation.CompositionStringStyle")]
    public enum CompositionStringStyle
    {
        /// <summary>Normal string expression </summary>
        [JsiiEnumMember("Normal")]
        Normal,
        /// <summary>Decorated string expression </summary>
        [JsiiEnumMember("Decorated")]
        Decorated
    }
}