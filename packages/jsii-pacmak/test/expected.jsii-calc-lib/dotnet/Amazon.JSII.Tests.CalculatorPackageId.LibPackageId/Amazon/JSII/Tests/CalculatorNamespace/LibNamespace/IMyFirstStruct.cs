using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii</summary>
    [JsiiInterface(typeof(IMyFirstStruct), "@scope/jsii-calc-lib.MyFirstStruct")]
    public interface IMyFirstStruct
    {
        /// <summary>An awesome number value</summary>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}")]
        double Anumber
        {
            get;
        }

        /// <summary>A string value</summary>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}")]
        string Astring
        {
            get;
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        string[] FirstOptional
        {
            get;
        }
    }
}