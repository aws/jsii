using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>summary: This is the first struct we have created in jsii.</remarks>
    [JsiiTypeProxy(typeof(IMyFirstStruct), "@scope/jsii-calc-lib.MyFirstStruct")]
    internal sealed class MyFirstStructProxy : DeputyBase, IMyFirstStruct
    {
        private MyFirstStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>summary: An awesome number value.</remarks>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}")]
        public double Anumber
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>summary: A string value.</remarks>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}")]
        public string Astring
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        public string[] FirstOptional
        {
            get => GetInstanceProperty<string[]>();
        }
    }
}