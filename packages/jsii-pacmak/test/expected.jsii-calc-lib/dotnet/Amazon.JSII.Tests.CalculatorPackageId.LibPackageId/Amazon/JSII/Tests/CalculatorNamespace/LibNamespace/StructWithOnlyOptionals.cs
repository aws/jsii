using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is a struct with only optional properties.</summary>
    [JsiiByValue]
    public class StructWithOnlyOptionals : IStructWithOnlyOptionals
    {
        /// <summary>The first optional!</summary>
        [JsiiProperty(name: "optional1", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Optional1
        {
            get;
            set;
        }

        [JsiiProperty(name: "optional2", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        public double? Optional2
        {
            get;
            set;
        }

        [JsiiProperty(name: "optional3", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true, isOverride: true)]
        public bool? Optional3
        {
            get;
            set;
        }
    }
}