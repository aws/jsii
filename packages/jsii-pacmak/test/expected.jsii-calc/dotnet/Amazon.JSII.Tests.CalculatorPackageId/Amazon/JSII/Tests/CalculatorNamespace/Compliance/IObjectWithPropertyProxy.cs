using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Make sure that setters are properly called on objects with interfaces.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IObjectWithProperty), fullyQualifiedName: "jsii-calc.compliance.IObjectWithProperty")]
    internal sealed class IObjectWithPropertyProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IObjectWithProperty
    {
        private IObjectWithPropertyProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        public string Property
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "wasSet", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}")]
        public bool WasSet()
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{}, new object[]{});
        }
    }
}
