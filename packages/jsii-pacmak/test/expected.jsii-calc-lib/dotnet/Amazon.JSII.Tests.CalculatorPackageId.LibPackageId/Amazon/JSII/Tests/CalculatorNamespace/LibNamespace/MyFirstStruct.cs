using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii.</summary>
    [JsiiByValue]
    public class MyFirstStruct : IMyFirstStruct
    {
        /// <summary>An awesome number value.</summary>
        [JsiiProperty("anumber", "{\"type\":{\"primitive\":\"number\"}}", true)]
        public double Anumber
        {
            get;
            set;
        }

        /// <summary>A string value.</summary>
        [JsiiProperty("astring", "{\"type\":{\"primitive\":\"string\"}}", true)]
        public string Astring
        {
            get;
            set;
        }

        [JsiiProperty("firstOptional", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}},\"optional\":true}", true)]
        public string[] FirstOptional
        {
            get;
            set;
        }
    }
}