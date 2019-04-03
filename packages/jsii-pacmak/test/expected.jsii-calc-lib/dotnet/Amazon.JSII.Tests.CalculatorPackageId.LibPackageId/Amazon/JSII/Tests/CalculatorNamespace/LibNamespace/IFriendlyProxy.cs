using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Applies to classes that are considered friendly.</summary>
    /// <remarks>
    /// These classes can be greeted with
    /// a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    /// </remarks>
    [JsiiTypeProxy(typeof(IIFriendly), "@scope/jsii-calc-lib.IFriendly")]
    internal sealed class IFriendlyProxy : DeputyBase, IIFriendly
    {
        private IFriendlyProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}