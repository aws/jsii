using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A struct which derives from another struct.</summary>
    [JsiiByValue]
    public class DerivedStruct : IDerivedStruct
    {
        /// <summary>This is optional.</summary>
        [JsiiProperty("anotherOptional", "{\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}},\"optional\":true}", true)]
        public IDictionary<string, Value_> AnotherOptional
        {
            get;
            set;
        }

        [JsiiProperty("anotherRequired", "{\"type\":{\"primitive\":\"date\"}}", true)]
        public DateTime AnotherRequired
        {
            get;
            set;
        }

        [JsiiProperty("bool", "{\"type\":{\"primitive\":\"boolean\"}}", true)]
        public bool Bool
        {
            get;
            set;
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty("nonPrimitive", "{\"type\":{\"fqn\":\"jsii-calc.DoubleTrouble\"}}", true)]
        public DoubleTrouble NonPrimitive
        {
            get;
            set;
        }

        [JsiiProperty("optionalAny", "{\"type\":{\"primitive\":\"any\"},\"optional\":true}", true)]
        public object OptionalAny
        {
            get;
            set;
        }

        [JsiiProperty("optionalArray", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}},\"optional\":true}", true)]
        public string[] OptionalArray
        {
            get;
            set;
        }

        /// <summary>An awesome number value.</summary>
        [JsiiProperty("anumber", "{\"type\":{\"primitive\":\"number\"}}", true)]
        public double Anumber
        {
            get;
            set;
        }

        /// <summary>A string value.</summary>
        [JsiiProperty("astring", "{\"type\":{\"primitive\":\"string\"}}", true)]
        public string Astring
        {
            get;
            set;
        }

        [JsiiProperty("firstOptional", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}},\"optional\":true}", true)]
        public string[] FirstOptional
        {
            get;
            set;
        }
    }
}