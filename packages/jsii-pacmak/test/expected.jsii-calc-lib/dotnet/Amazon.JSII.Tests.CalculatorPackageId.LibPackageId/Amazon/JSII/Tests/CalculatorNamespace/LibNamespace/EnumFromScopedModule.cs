using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Check that enums from \@scoped packages can be references. See awslabs/jsii#138.</summary>
    [JsiiEnum(nativeType: typeof(EnumFromScopedModule), fullyQualifiedName: "@scope/jsii-calc-lib.EnumFromScopedModule")]
    public enum EnumFromScopedModule
    {
        [JsiiEnumMember(name: "Value1")]
        Value1,
        [JsiiEnumMember(name: "Value2")]
        Value2
    }
}