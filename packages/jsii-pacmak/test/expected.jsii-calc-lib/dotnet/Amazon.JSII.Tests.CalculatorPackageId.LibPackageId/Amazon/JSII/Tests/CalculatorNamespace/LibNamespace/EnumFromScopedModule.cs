using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Check that enums from \@scoped packages can be references. See awslabs/jsii#138.</summary>
    /// <remarks>
    /// stability: deprecated
    /// </remarks>
    [JsiiEnum(nativeType: typeof(EnumFromScopedModule), fullyQualifiedName: "@scope/jsii-calc-lib.EnumFromScopedModule")]
    [System.Obsolete()]
    public enum EnumFromScopedModule
    {
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiEnumMember(name: "Value1")]
        [System.Obsolete()]
        Value1,
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiEnumMember(name: "Value2")]
        [System.Obsolete()]
        Value2
    }
}
