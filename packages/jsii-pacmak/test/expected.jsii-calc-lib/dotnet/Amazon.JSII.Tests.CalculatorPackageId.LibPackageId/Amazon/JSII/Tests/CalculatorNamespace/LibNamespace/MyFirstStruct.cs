using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>summary: This is the first struct we have created in jsii.</remarks>
    [JsiiByValue]
    public class MyFirstStruct : IMyFirstStruct
    {
        /// <remarks>summary: An awesome number value.</remarks>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}", true)]
        public double Anumber
        {
            get;
            set;
        }

        /// <remarks>summary: A string value.</remarks>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}", true)]
        public string Astring
        {
            get;
            set;
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}", true)]
        public string[] FirstOptional
        {
            get;
            set;
        }
    }
}