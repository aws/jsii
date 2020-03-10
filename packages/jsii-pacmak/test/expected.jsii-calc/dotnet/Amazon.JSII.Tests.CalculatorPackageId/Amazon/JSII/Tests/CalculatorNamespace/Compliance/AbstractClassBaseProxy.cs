using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClassBase), fullyQualifiedName: "jsii-calc.compliance.AbstractClassBase")]
    internal sealed class AbstractClassBaseProxy : Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClassBase
    {
        private AbstractClassBaseProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "abstractProperty", typeJson: "{\"primitive\":\"string\"}")]
        public override string AbstractProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
