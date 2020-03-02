using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that, in languages that do keyword lifting (e.g: Python), having a struct member with the same name as a positional parameter results in the correct code being emitted.</summary>
    /// <remarks>
    /// See: https://github.com/aws/aws-cdk/issues/4302
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructParameterType), fullyQualifiedName: "jsii-calc.StructParameterType")]
    internal sealed class StructParameterTypeProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStructParameterType
    {
        private StructParameterTypeProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "scope", typeJson: "{\"primitive\":\"string\"}")]
        public string Scope
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "props", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        public bool? Props
        {
            get => GetInstanceProperty<bool?>();
        }
    }
}
