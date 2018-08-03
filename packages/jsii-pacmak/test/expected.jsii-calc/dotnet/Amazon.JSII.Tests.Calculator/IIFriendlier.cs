using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.Lib;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    [JsiiInterface(typeof(IIFriendlier), "jsii-calc.IFriendlier")]
    public interface IIFriendlier : IIFriendly
    {
        /// <summary>Say goodbye.</summary>
        /// <returns>A goodbye blessing.</returns>
        [JsiiMethod("goodbye", "{\"primitive\":\"string\"}", "[]")]
        string Goodbye();
        /// <summary>Say farewell.</summary>
        [JsiiMethod("farewell", "{\"primitive\":\"string\"}", "[]")]
        string Farewell();
    }
}