using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Interface that inherits from packages 2 levels up the tree.</summary>
    /// <remarks>
    /// Their presence validates that .NET/Java/jsii-reflect can track all fields
    /// far enough up the tree.
    /// stability: Deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIThreeLevelsInterface), fullyQualifiedName: "@scope/jsii-calc-lib.IThreeLevelsInterface")]
    [System.Obsolete()]
    public interface IIThreeLevelsInterface : IIBaseInterface
    {
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "baz")]
        [System.Obsolete()]
        void Baz();
    }
}
