using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.Lib
{
    /// <summary>This is a struct with only optional properties.</summary>
    [JsiiInterface(typeof(IStructWithOnlyOptionals), "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    public interface IStructWithOnlyOptionals
    {
        /// <summary>The first optional!</summary>
        [JsiiProperty("optional1", "{\"primitive\":\"string\",\"optional\":true}")]
        string Optional1
        {
            get;
            set;
        }

        [JsiiProperty("optional2", "{\"primitive\":\"number\",\"optional\":true}")]
        double? Optional2
        {
            get;
            set;
        }

        [JsiiProperty("optional3", "{\"primitive\":\"boolean\",\"optional\":true}")]
        bool? Optional3
        {
            get;
            set;
        }
    }
}