using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIFriendlier), fullyQualifiedName: "jsii-calc.IFriendlier")]
    public interface IIFriendlier : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IIFriendly
    {
        /// <summary>Say farewell.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "farewell", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Farewell();
        /// <summary>Say goodbye.</summary>
        /// <returns>
        /// A goodbye blessing.
        /// </returns>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "goodbye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Goodbye();
    }
}
