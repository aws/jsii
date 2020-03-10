using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IMutableObjectLiteral), fullyQualifiedName: "jsii-calc.compliance.IMutableObjectLiteral")]
    internal sealed class IMutableObjectLiteralProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IMutableObjectLiteral
    {
        private IMutableObjectLiteralProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public string Value
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
