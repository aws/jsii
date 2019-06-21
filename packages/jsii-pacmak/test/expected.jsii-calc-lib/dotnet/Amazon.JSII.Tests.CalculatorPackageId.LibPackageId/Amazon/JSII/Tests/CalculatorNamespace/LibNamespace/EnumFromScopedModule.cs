using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Check that enums from \@scoped packages can be references. See awslabs/jsii#138.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiEnum(nativeType: typeof(EnumFromScopedModule), fullyQualifiedName: "@scope/jsii-calc-lib.EnumFromScopedModule")]
    [System.Obsolete()]
    public enum EnumFromScopedModule
    {
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "VALUE1")]
        [System.Obsolete()]
        VALUE1,
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "VALUE2")]
        [System.Obsolete()]
        VALUE2
    }
}
