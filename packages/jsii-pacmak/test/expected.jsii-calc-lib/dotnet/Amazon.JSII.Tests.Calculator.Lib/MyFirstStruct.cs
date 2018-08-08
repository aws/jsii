using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.Lib
{
    /// <summary>This is the first struct we have created in jsii</summary>
    public class MyFirstStruct : DeputyBase, IMyFirstStruct
    {
        /// <summary>A string value</summary>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}", true)]
        public string Astring
        {
            get;
            set;
        }

        /// <summary>An awesome number value</summary>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}", true)]
        public double Anumber
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