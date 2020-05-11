using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>External</strong>: true
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IExternalStruct), fullyQualifiedName: "jsii-calc.ExternalStruct")]
    internal sealed class ExternalStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IExternalStruct
    {
        private ExternalStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// 
        /// <strong>External</strong>: true
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
