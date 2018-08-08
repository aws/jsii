using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.Lib
{
    /// <summary>
    /// Applies to classes that are considered friendly. These classes can be greeted with
    /// a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    /// </summary>
    [JsiiInterface(typeof(IIFriendly), "@scope/jsii-calc-lib.IFriendly")]
    public interface IIFriendly
    {
        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        string Hello();
    }
}