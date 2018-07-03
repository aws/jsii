using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator.Lib
{
    /// <summary>
    /// Applies to classes that are considered friendly. These classes can be greeted with
    /// a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
    /// </summary>
    [JsiiInterfaceProxy("jsii-calc-lib", "jsii$jsii_calc_lib$.IFriendly")]
    internal class IFriendlyProxy : DeputyBase, IIFriendly
    {
        private IFriendlyProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod("hello", "{\"primitive\":\"string\"}", "[]")]
        public virtual string Hello()
        {
            return InvokeMethod<string>(new object[]{});
        }
    }
}