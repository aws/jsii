using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Interface that inherits from packages 2 levels up the tree.</summary>
    /// <remarks>
    /// Their presence validates that .NET/Java/jsii-reflect can track all fields
    /// far enough up the tree.
    /// 
<<<<<<< HEAD
    /// <strong>Stability</strong>: Deprecated
=======
    /// stability: Deprecated
>>>>>>> origin/master
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IThreeLevelsInterface), fullyQualifiedName: "@scope/jsii-calc-lib.IThreeLevelsInterface")]
    [System.Obsolete()]
    public interface IThreeLevelsInterface : Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.IBaseInterface
    {
        /// <summary></summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiMethod(name: "baz")]
        [System.Obsolete()]
        void Baz();
    }
}
