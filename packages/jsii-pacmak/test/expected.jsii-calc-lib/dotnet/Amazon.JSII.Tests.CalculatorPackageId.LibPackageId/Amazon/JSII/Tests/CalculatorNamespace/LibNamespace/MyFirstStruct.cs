using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiByValue(fqn: "@scope/jsii-calc-lib.MyFirstStruct")]
    public class MyFirstStruct : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct
    {
        /// <summary>An awesome number value.</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        [System.Obsolete()]
        public double Anumber
        {
            get;
            set;
        }

        /// <summary>A string value.</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        [System.Obsolete()]
        public string Astring
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true, isOverride: true)]
        [System.Obsolete()]
        public string[] FirstOptional
        {
            get;
            set;
        }
    }
}
