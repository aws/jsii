using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is a struct with only optional properties.</summary>
    [JsiiInterface(typeof(IStructWithOnlyOptionals), "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    public interface IStructWithOnlyOptionals
    {
        /// <summary>The first optional!</summary>
        [JsiiProperty(name: "optional1", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Optional1
        {
            get;
        }

        [JsiiProperty(name: "optional2", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        double? Optional2
        {
            get;
        }

        [JsiiProperty(name: "optional3", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        bool? Optional3
        {
            get;
        }
    }
}