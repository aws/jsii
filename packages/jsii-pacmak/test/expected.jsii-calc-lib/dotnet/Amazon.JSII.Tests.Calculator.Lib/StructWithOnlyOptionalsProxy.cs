using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.Lib
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
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("optional2", "{\"primitive\":\"number\",\"optional\":true}")]
        public virtual double? Optional2
        {
            get => GetInstanceProperty<double? >();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("optional3", "{\"primitive\":\"boolean\",\"optional\":true}")]
        public virtual bool? Optional3
        {
            get => GetInstanceProperty<bool? >();
            set => SetInstanceProperty(value);
        }
    }
}