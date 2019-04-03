using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>
    /// remarks: These classes can be greeted with
    /// a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    /// summary: Applies to classes that are considered friendly.
    /// </remarks>
    [JsiiInterface(typeof(IIFriendly), "@scope/jsii-calc-lib.IFriendly")]
    public interface IIFriendly
    {
        /// <remarks>summary: Say hello!</remarks>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        string Hello();
    }
}