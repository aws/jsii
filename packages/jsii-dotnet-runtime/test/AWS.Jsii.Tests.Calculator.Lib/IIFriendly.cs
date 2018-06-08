using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator.Lib
{
    /// <summary>
    /// Applies to classes that are considered friendly. These classes can be greeted with
    /// a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    /// </summary>
    [JsiiInterface("jsii-calc-lib", "jsii$jsii_calc_lib$.IFriendly")]
    public interface IIFriendly
    {
        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        string Hello();
    }
}