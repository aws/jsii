using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    [JsiiInterface("jsii-calc", "jsii$jsii_calc$.IFriendlier")]
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