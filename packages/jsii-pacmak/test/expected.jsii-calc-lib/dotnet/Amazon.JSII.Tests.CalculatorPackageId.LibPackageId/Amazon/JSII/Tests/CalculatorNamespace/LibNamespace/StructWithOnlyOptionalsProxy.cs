using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is a struct with only optional properties.</summary>
    [JsiiTypeProxy(typeof(IStructWithOnlyOptionals), "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    internal sealed class StructWithOnlyOptionalsProxy : DeputyBase, IStructWithOnlyOptionals
    {
        private StructWithOnlyOptionalsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The first optional!</summary>
        [JsiiProperty(name: "optional1", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Optional1
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "optional2", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? Optional2
        {
            get => GetInstanceProperty<double? >();
        }

        [JsiiProperty(name: "optional3", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        public bool? Optional3
        {
            get => GetInstanceProperty<bool? >();
        }
    }
}