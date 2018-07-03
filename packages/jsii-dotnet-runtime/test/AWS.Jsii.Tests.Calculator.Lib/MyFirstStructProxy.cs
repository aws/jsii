using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator.Lib
{
    /// <summary>This is the first struct we have created in jsii</summary>
    [JsiiInterfaceProxy("jsii-calc-lib", "jsii$jsii_calc_lib$.MyFirstStruct")]
    internal class MyFirstStructProxy : DeputyBase, IMyFirstStruct
    {
        private MyFirstStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>A string value</summary>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}")]
        public virtual string Astring
        {
            get => GetProperty<string>();
            set => SetProperty(value);
        }

        /// <summary>An awesome number value</summary>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}")]
        public virtual double Anumber
        {
            get => GetProperty<double>();
            set => SetProperty(value);
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        public virtual string[] FirstOptional
        {
            get => GetProperty<string[]>();
            set => SetProperty(value);
        }
    }
}