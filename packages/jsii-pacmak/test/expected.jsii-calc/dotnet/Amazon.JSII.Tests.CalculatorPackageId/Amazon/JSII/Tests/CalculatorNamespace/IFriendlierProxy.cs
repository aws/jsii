using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Even friendlier classes can implement this interface.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IFriendlier), fullyQualifiedName: "jsii-calc.IFriendlier")]
    internal sealed class IFriendlierProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IFriendlier
    {
        private IFriendlierProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Say farewell.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "farewell", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Farewell()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Say goodbye.</summary>
        /// <returns>A goodbye blessing.</returns>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "goodbye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Goodbye()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Say hello!</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        [System.Obsolete()]
        public string Hello()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
