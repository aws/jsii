using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is a struct with only optional properties.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiByValue(fqn: "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    public class StructWithOnlyOptionals : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IStructWithOnlyOptionals
    {
        /// <summary>The first optional!</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optional1", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        [System.Obsolete()]
        public string Optional1
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optional2", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        [System.Obsolete()]
        public double? Optional2
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optional3", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true, isOverride: true)]
        [System.Obsolete()]
        public bool? Optional3
        {
            get;
            set;
        }
    }
}
