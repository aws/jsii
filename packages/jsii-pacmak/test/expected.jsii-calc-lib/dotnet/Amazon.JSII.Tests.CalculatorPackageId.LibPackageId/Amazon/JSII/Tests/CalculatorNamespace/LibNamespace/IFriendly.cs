using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Applies to classes that are considered friendly.</summary>
    /// <remarks>
    /// These classes can be greeted with
    /// a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    /// 
    /// stability: Deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IFriendly), fullyQualifiedName: "@scope/jsii-calc-lib.IFriendly")]
    [System.Obsolete()]
    public interface IFriendly
    {
        /// <summary>Say hello!</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        [System.Obsolete()]
        string Hello();
    }
}
