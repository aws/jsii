using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Deprecated</remarks>
    [JsiiEnum(nativeType: typeof(DeprecatedEnum), fullyQualifiedName: "jsii-calc.DeprecatedEnum")]
    [System.Obsolete("your deprecated selection of bad options")]
    public enum DeprecatedEnum
    {
        /// <remarks>stability: Deprecated</remarks>
        [JsiiEnumMember(name: "OptionA")]
        [System.Obsolete("option A is not great")]
        OptionA,
        /// <remarks>stability: Deprecated</remarks>
        [JsiiEnumMember(name: "OptionB")]
        [System.Obsolete("option B is kinda bad, too")]
        OptionB
    }
}