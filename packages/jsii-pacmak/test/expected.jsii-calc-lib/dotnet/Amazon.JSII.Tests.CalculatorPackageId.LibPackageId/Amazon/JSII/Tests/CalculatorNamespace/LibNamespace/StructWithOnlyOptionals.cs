using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is a struct with only optional properties.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiByValue]
    public class StructWithOnlyOptionals : IStructWithOnlyOptionals
    {
        /// <summary>The first optional!</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional1", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        [System.Obsolete()]
        public string Optional1
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional2", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        [System.Obsolete()]
        public double? Optional2
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional3", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true, isOverride: true)]
        [System.Obsolete()]
        public bool? Optional3
        {
            get;
            set;
        }
    }
}
