using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IMutableObjectLiteral), fullyQualifiedName: "jsii-calc.IMutableObjectLiteral")]
    internal sealed class IMutableObjectLiteralProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IMutableObjectLiteral
    {
        private IMutableObjectLiteralProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public string Value
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
