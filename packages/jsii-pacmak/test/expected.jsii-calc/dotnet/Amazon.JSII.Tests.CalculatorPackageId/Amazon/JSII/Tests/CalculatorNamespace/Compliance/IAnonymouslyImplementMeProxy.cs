using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IAnonymouslyImplementMe), fullyQualifiedName: "jsii-calc.compliance.IAnonymouslyImplementMe")]
    internal sealed class IAnonymouslyImplementMeProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnonymouslyImplementMe
    {
        private IAnonymouslyImplementMeProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "verb", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public string Verb()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }
    }
}
