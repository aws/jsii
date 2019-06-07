using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    [JsiiInterface(nativeType: typeof(IIFriendlier), fullyQualifiedName: "jsii-calc.IFriendlier")]
    public interface IIFriendlier : IIFriendly
    {
        /// <summary>Say farewell.</summary>
        [JsiiMethod(name: "farewell", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Farewell();
        /// <summary>Say goodbye.</summary>
        /// <returns>A goodbye blessing.</returns>
        [JsiiMethod(name: "goodbye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Goodbye();
    }
}
