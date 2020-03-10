using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.StructWithJavaReservedWords")]
    public class StructWithJavaReservedWords : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructWithJavaReservedWords
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "default", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Default
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "assert", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Assert
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "result", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Result
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "that", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? That
        {
            get;
            set;
        }
    }
}
