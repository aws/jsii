using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>summary: This is the first struct we have created in jsii.</remarks>
    [JsiiInterface(typeof(IMyFirstStruct), "@scope/jsii-calc-lib.MyFirstStruct")]
    public interface IMyFirstStruct
    {
        /// <remarks>summary: An awesome number value.</remarks>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}")]
        double Anumber
        {
            get;
        }

        /// <remarks>summary: A string value.</remarks>
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