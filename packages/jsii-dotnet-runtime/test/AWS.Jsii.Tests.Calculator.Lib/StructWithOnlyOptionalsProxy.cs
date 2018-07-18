using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator.Lib
{
    /// <summary>This is a struct with only optional properties.</summary>
    [JsiiInterfaceProxy(typeof(IStructWithOnlyOptionals), "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    internal class StructWithOnlyOptionalsProxy : DeputyBase, IStructWithOnlyOptionals
    {
        private StructWithOnlyOptionalsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The first optional!</summary>
        [JsiiProperty("optional1", "{\"primitive\":\"string\",\"optional\":true}")]
        public virtual string Optional1
        {
            get => GetProperty<string>();
            set => SetProperty(value);
        }

        [JsiiProperty("optional2", "{\"primitive\":\"number\",\"optional\":true}")]
        public virtual double? Optional2
        {
            get => GetProperty<double? >();
            set => SetProperty(value);
        }

        [JsiiProperty("optional3", "{\"primitive\":\"boolean\",\"optional\":true}")]
        public virtual bool? Optional3
        {
            get => GetProperty<bool? >();
            set => SetProperty(value);
        }
    }
}