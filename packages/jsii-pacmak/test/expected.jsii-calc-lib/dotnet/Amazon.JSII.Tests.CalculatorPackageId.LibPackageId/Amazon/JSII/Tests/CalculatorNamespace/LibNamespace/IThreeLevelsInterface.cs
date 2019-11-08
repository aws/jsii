using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Interface that inherits from packages 2 levels up the tree.</summary>
    /// <remarks>
    /// Their presence validates that .NET/Java/jsii-reflect can track all fields
    /// far enough up the tree.
    /// stability: Deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IThreeLevelsInterface), fullyQualifiedName: "@scope/jsii-calc-lib.IThreeLevelsInterface")]
    [System.Obsolete()]
    public interface IThreeLevelsInterface : Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.IBaseInterface
    {
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "baz")]
        [System.Obsolete()]
        void Baz();
    }
}
