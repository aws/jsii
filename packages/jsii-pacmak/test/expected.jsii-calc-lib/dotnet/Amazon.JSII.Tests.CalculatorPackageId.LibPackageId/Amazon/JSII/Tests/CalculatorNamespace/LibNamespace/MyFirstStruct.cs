using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii.</summary>
    [JsiiByValue]
    public class MyFirstStruct : IMyFirstStruct
    {
        /// <summary>An awesome number value.</summary>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double Anumber
        {
            get;
            set;
        }

        /// <summary>A string value.</summary>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Astring
        {
            get;
            set;
        }

        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true, isOverride: true)]
        public string[] FirstOptional
        {
            get;
            set;
        }
    }
}
