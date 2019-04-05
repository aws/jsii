using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii.</summary>
    [JsiiTypeProxy(typeof(IMyFirstStruct), "@scope/jsii-calc-lib.MyFirstStruct")]
    internal sealed class MyFirstStructProxy : DeputyBase, IMyFirstStruct
    {
        private MyFirstStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>An awesome number value.</summary>
        [JsiiProperty("anumber", "{\"type\":{\"primitive\":\"number\"}}")]
        public double Anumber
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>A string value.</summary>
        [JsiiProperty("astring", "{\"type\":{\"primitive\":\"string\"}}")]
        public string Astring
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("firstOptional", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}},\"optional\":true}")]
        public string[] FirstOptional
        {
            get => GetInstanceProperty<string[]>();
        }
    }
}