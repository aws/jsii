using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    /// <summary>Verifies that, in languages that do keyword lifting (e.g: Python), having a struct member with the same name as a positional parameter results in the correct code being emitted.</summary>
    /// <remarks>
    /// See: https://github.com/aws/aws-cdk/issues/4302
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.StructParameterType")]
    public class StructParameterType : Amazon.JSII.Tests.CalculatorNamespace.IStructParameterType
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "scope", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Scope
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "props", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true, isOverride: true)]
        public bool? Props
        {
            get;
            set;
        }
    }
}
