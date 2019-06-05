using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This enum is there to test various stability levels are correctly emitted.</summary>
    /// <remarks>stability: Stable</remarks>
    [JsiiEnum(nativeType: typeof(StabilityTest), fullyQualifiedName: "jsii-calc.StabilityTest")]
    public enum StabilityTest
    {
        /// <remarks>
        /// deprecated: yeah this one's no good
        /// stability: Deprecated
        /// </remarks>
        [JsiiEnumMember(name: "DeprecatedMember")]
        DeprecatedMember,
        /// <remarks>stability: Experimental</remarks>
        [JsiiEnumMember(name: "ExperimentalMember")]
        ExperimentalMember,
        /// <remarks>stability: Stable</remarks>
        [JsiiEnumMember(name: "StableMember")]
        StableMember
    }
}