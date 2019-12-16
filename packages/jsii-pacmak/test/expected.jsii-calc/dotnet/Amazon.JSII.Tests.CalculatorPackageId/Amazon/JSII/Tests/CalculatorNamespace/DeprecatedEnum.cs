using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{

    /// <summary></summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiEnum(nativeType: typeof(DeprecatedEnum), fullyQualifiedName: "jsii-calc.DeprecatedEnum")]
    [System.Obsolete("your deprecated selection of bad options")]
    public enum DeprecatedEnum
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "OPTION_A")]
        [System.Obsolete("option A is not great")]
        OPTION_A,
        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "OPTION_B")]
        [System.Obsolete("option B is kinda bad, too")]
        OPTION_B
    }
}
