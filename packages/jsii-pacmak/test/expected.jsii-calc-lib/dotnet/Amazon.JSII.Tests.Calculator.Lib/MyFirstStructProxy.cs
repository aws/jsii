using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.Lib
{
    /// <summary>This is the first struct we have created in jsii</summary>
    [JsiiInterfaceProxy(typeof(IMyFirstStruct), "@scope/jsii-calc-lib.MyFirstStruct")]
    internal class MyFirstStructProxy : DeputyBase, IMyFirstStruct
    {
        private MyFirstStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>A string value</summary>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}")]
        public virtual string Astring
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <summary>An awesome number value</summary>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}")]
        public virtual double Anumber
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        public virtual string[] FirstOptional
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }
    }
}