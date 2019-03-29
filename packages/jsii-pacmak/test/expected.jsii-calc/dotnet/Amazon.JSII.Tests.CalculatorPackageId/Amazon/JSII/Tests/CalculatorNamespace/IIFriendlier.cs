using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Even friendlier classes can implement this interface.</remarks>
    [JsiiInterface(typeof(IIFriendlier), "jsii-calc.IFriendlier")]
    public interface IIFriendlier : IIFriendly
    {
        /// <remarks>summary: Say farewell.</remarks>
        [JsiiMethod("farewell", "{\"primitive\":\"string\"}", "[]")]
        string Farewell();
        /// <remarks>
        /// returns: A goodbye blessing.
        /// summary: Say goodbye.
        /// </remarks>
        [JsiiMethod("goodbye", "{\"primitive\":\"string\"}", "[]")]
        string Goodbye();
    }
}