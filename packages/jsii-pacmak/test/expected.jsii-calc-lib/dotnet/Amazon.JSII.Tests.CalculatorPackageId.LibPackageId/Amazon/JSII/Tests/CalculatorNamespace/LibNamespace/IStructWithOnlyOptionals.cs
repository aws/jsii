using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>summary: This is a struct with only optional properties.</remarks>
    [JsiiInterface(typeof(IStructWithOnlyOptionals), "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    public interface IStructWithOnlyOptionals
    {
        /// <remarks>summary: The first optional!</remarks>
        [JsiiProperty("optional1", "{\"primitive\":\"string\",\"optional\":true}")]
        string Optional1
        {
            get;
        }

        [JsiiProperty("optional2", "{\"primitive\":\"number\",\"optional\":true}")]
        double? Optional2
        {
            get;
        }

        [JsiiProperty("optional3", "{\"primitive\":\"boolean\",\"optional\":true}")]
        bool? Optional3
        {
            get;
        }
    }
}