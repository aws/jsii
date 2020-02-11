using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Check that enums from \@scoped packages can be references.</summary>
    /// <remarks>
    /// See awslabs/jsii#138
    /// 
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiEnum(nativeType: typeof(EnumFromScopedModule), fullyQualifiedName: "@scope/jsii-calc-lib.EnumFromScopedModule")]
    [System.Obsolete()]
    public enum EnumFromScopedModule
    {
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "VALUE1")]
        [System.Obsolete()]
        VALUE1,
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "VALUE2")]
        [System.Obsolete()]
        VALUE2
    }
}
