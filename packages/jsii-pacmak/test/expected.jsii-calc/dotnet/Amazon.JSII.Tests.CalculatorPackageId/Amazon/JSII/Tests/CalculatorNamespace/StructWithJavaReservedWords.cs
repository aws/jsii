using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.StructWithJavaReservedWords")]
    public class StructWithJavaReservedWords : Amazon.JSII.Tests.CalculatorNamespace.IStructWithJavaReservedWords
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "default", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Default
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "assert", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Assert
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "result", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Result
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "that", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string That
        {
            get;
            set;
        }
    }
}
