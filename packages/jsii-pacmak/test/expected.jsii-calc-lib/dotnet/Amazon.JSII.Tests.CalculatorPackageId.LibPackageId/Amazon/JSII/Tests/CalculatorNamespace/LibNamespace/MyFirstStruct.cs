using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii.</summary>
    /// <remarks>stability: Deprecated</remarks>
    [JsiiByValue]
    public class MyFirstStruct : IMyFirstStruct
    {
        /// <summary>An awesome number value.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        [System.Obsolete()]
        public double Anumber
        {
            get;
            set;
        }

        /// <summary>A string value.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        [System.Obsolete()]
        public string Astring
        {
            get;
            set;
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", isOptional: true, isOverride: true)]
        [System.Obsolete()]
        public string[] FirstOptional
        {
            get;
            set;
        }
    }
}