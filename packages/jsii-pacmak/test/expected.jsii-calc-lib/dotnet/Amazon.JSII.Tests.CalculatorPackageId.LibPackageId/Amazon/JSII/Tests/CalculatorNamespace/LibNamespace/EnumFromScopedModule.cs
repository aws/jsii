using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>
    /// remarks: See awslabs/jsii#138
    /// summary: Check that enums from \@scoped packages can be references.
    /// </remarks>
    [JsiiEnum(typeof(EnumFromScopedModule), "@scope/jsii-calc-lib.EnumFromScopedModule")]
    public enum EnumFromScopedModule
    {
        [JsiiEnumMember("Value1")]
        Value1,
        [JsiiEnumMember("Value2")]
        Value2
    }
}