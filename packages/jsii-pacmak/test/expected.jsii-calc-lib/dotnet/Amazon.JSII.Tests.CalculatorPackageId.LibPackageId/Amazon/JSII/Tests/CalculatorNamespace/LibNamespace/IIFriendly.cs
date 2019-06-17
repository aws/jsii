using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Applies to classes that are considered friendly.</summary>
    /// <remarks>
    /// These classes can be greeted with
    /// a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    /// stability: deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIFriendly), fullyQualifiedName: "@scope/jsii-calc-lib.IFriendly")]
    [System.Obsolete()]
    public interface IIFriendly
    {
        /// <summary>Say hello!</summary>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        [System.Obsolete()]
        string Hello();
    }
}
