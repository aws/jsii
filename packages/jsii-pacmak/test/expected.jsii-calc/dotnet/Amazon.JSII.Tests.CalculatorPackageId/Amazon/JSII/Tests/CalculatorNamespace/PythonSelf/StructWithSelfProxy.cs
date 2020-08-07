using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.PythonSelf
{
    /// <summary> (experimental)</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructWithSelf), fullyQualifiedName: "jsii-calc.PythonSelf.StructWithSelf")]
    internal sealed class StructWithSelfProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.IStructWithSelf
    {
        private StructWithSelfProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "self", typeJson: "{\"primitive\":\"string\"}")]
        public string Self
        {
            get => GetInstanceProperty<string>();
        }
    }
}
