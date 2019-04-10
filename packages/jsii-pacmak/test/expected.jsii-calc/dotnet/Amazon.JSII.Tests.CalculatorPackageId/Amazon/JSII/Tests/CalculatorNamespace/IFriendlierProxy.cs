using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    [JsiiTypeProxy(nativeType: typeof(IIFriendlier), fullyQualifiedName: "jsii-calc.IFriendlier")]
    internal sealed class IFriendlierProxy : DeputyBase, IIFriendlier
    {
        private IFriendlierProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Say farewell.</summary>
        [JsiiMethod(name: "farewell", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Farewell()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say goodbye.</summary>
        /// <returns>A goodbye blessing.</returns>
        [JsiiMethod(name: "goodbye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Goodbye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}