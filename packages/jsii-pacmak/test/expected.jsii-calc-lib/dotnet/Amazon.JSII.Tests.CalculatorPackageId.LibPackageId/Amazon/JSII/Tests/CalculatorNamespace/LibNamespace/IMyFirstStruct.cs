using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii.</summary>
    [JsiiInterface(typeof(IMyFirstStruct), "@scope/jsii-calc-lib.MyFirstStruct")]
    public interface IMyFirstStruct
    {
        /// <summary>An awesome number value.</summary>
        [JsiiProperty("anumber", "{\"type\":{\"primitive\":\"number\"}}")]
        double Anumber
        {
            get;
        }

        /// <summary>A string value.</summary>
        [JsiiProperty("astring", "{\"type\":{\"primitive\":\"string\"}}")]
        string Astring
        {
            get;
        }

        [JsiiProperty("firstOptional", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}},\"optional\":true}")]
        string[] FirstOptional
        {
            get;
        }
    }
}