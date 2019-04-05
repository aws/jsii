using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    [JsiiInterface(typeof(IIFriendlier), "jsii-calc.IFriendlier")]
    public interface IIFriendlier : IIFriendly
    {
        /// <summary>Say farewell.</summary>
        [JsiiMethod("farewell", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        string Farewell();
        /// <summary>Say goodbye.</summary>
        /// <returns>A goodbye blessing.</returns>
        [JsiiMethod("goodbye", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        string Goodbye();
    }
}