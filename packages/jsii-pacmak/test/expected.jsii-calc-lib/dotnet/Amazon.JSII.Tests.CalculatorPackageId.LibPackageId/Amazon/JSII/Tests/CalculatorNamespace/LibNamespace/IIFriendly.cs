using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Applies to classes that are considered friendly.</summary>
    /// <remarks>
    /// These classes can be greeted with
    /// a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    /// </remarks>
    [JsiiInterface(typeof(IIFriendly), "@scope/jsii-calc-lib.IFriendly")]
    public interface IIFriendly
    {
        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        string Hello();
    }
}