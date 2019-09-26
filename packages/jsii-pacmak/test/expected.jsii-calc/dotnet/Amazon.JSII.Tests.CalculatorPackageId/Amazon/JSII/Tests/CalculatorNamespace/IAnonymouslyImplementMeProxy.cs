using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IAnonymouslyImplementMe), fullyQualifiedName: "jsii-calc.IAnonymouslyImplementMe")]
    internal sealed class IAnonymouslyImplementMeProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe
    {
        private IAnonymouslyImplementMeProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public double Value
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "verb", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Verb()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
