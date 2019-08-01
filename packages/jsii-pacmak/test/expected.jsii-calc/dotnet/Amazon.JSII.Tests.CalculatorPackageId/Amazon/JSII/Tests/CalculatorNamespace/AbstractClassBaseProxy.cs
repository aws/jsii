using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AbstractClassBase), fullyQualifiedName: "jsii-calc.AbstractClassBase")]
    internal sealed class AbstractClassBaseProxy : Amazon.JSII.Tests.CalculatorNamespace.AbstractClassBase
    {
        private AbstractClassBaseProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "abstractProperty", typeJson: "{\"primitive\":\"string\"}")]
        public override string AbstractProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
