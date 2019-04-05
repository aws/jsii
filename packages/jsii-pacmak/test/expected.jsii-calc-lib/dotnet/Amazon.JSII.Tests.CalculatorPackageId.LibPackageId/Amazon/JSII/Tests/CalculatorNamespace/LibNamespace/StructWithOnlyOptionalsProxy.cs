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
        [JsiiProperty("optional1", "{\"type\":{\"primitive\":\"string\"},\"optional\":true}")]
        public string Optional1
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("optional2", "{\"type\":{\"primitive\":\"number\"},\"optional\":true}")]
        public double? Optional2
        {
            get => GetInstanceProperty<double? >();
        }

        [JsiiProperty("optional3", "{\"type\":{\"primitive\":\"boolean\"},\"optional\":true}")]
        public bool? Optional3
        {
            get => GetInstanceProperty<bool? >();
        }
    }
}