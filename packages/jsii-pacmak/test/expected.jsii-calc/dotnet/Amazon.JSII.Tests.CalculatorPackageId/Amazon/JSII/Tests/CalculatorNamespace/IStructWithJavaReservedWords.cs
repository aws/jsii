using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStructWithJavaReservedWords), fullyQualifiedName: "jsii-calc.StructWithJavaReservedWords")]
    public interface IStructWithJavaReservedWords
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "default", typeJson: "{\"primitive\":\"string\"}")]
        string Default
        {
            get;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "assert", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Assert
        {
            #if NETCOREAPP3_0
            get
            {
                return null;
            }
            #else
            get;
            #endif
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "result", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Result
        {
            #if NETCOREAPP3_0
            get
            {
                return null;
            }
            #else
            get;
            #endif
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "that", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string That
        {
            #if NETCOREAPP3_0
            get
            {
                return null;
            }
            #else
            get;
            #endif
        }
    }
}
