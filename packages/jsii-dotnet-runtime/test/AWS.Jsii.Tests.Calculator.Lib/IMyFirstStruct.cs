using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator.Lib
{
    /// <summary>This is the first struct we have created in jsii</summary>
    [JsiiInterface("jsii-calc-lib", "jsii$jsii_calc_lib$.MyFirstStruct")]
    public interface IMyFirstStruct
    {
        /// <summary>A string value</summary>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}")]
        string Astring
        {
            get;
            set;
        }

        /// <summary>An awesome number value</summary>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}")]
        double Anumber
        {
            get;
            set;
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        string[] FirstOptional
        {
            get;
            set;
        }
    }
}