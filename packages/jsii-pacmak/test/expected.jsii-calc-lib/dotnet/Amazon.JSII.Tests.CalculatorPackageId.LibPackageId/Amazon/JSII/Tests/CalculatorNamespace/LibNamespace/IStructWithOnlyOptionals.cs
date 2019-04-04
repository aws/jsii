using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is a struct with only optional properties.</summary>
    [JsiiInterface(typeof(IStructWithOnlyOptionals), "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    public interface IStructWithOnlyOptionals
    {
        /// <summary>The first optional!</summary>
        [JsiiProperty("optional1", "{\"primitive\":\"string\",\"nullable\":true}")]
        string Optional1
        {
            get;
        }

        [JsiiProperty("optional2", "{\"primitive\":\"number\",\"nullable\":true}")]
        double? Optional2
        {
            get;
        }

        [JsiiProperty("optional3", "{\"primitive\":\"boolean\",\"nullable\":true}")]
        bool? Optional3
        {
            get;
        }
    }
}