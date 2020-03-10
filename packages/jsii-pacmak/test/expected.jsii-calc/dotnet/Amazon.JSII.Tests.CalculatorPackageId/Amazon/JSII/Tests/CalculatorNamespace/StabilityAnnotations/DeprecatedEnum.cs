using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations
{

    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiEnum(nativeType: typeof(DeprecatedEnum), fullyQualifiedName: "jsii-calc.stability_annotations.DeprecatedEnum")]
    [System.Obsolete("your deprecated selection of bad options")]
    public enum DeprecatedEnum
    {
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "OPTION_A")]
        [System.Obsolete("option A is not great")]
        OPTION_A,
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "OPTION_B")]
        [System.Obsolete("option B is kinda bad, too")]
        OPTION_B
    }
}
