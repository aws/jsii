using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue]
    public class StructWithJavaReservedWords : Amazon.JSII.Tests.CalculatorNamespace.IStructWithJavaReservedWords
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "default", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Default
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "assert", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Assert
        {
            get;
            set;
        }
    }
}
