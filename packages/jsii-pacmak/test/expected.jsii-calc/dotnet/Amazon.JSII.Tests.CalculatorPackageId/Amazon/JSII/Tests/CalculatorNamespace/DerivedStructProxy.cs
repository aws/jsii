using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: A struct which derives from another struct.</remarks>
    [JsiiTypeProxy(typeof(IDerivedStruct), "jsii-calc.DerivedStruct")]
    internal sealed class DerivedStructProxy : DeputyBase, IDerivedStruct
    {
        private DerivedStructProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("anotherRequired", "{\"primitive\":\"date\"}")]
        public DateTime AnotherRequired
        {
            get => GetInstanceProperty<DateTime>();
        }

        [JsiiProperty("bool", "{\"primitive\":\"boolean\"}")]
        public bool Bool
        {
            get => GetInstanceProperty<bool>();
        }

        /// <remarks>summary: An example of a non primitive property.</remarks>
        [JsiiProperty("nonPrimitive", "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        public DoubleTrouble NonPrimitive
        {
            get => GetInstanceProperty<DoubleTrouble>();
        }

        /// <remarks>summary: This is optional.</remarks>
        [JsiiProperty("anotherOptional", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},\"optional\":true}")]
        public IDictionary<string, Value_> AnotherOptional
        {
            get => GetInstanceProperty<IDictionary<string, Value_>>();
        }

        [JsiiProperty("optionalAny", "{\"primitive\":\"any\",\"optional\":true}")]
        public object OptionalAny
        {
            get => GetInstanceProperty<object>();
        }

        [JsiiProperty("optionalArray", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        public string[] OptionalArray
        {
            get => GetInstanceProperty<string[]>();
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