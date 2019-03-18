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
        [JsiiProperty("anotherRequired", "{\"primitive\":\"date\"}", true)]
        public DateTime AnotherRequired
        {
            get;
            set;
        }

        [JsiiProperty("bool", "{\"primitive\":\"boolean\"}", true)]
        public bool Bool
        {
            get;
            set;
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty("nonPrimitive", "{\"fqn\":\"jsii-calc.DoubleTrouble\"}", true)]
        public DoubleTrouble NonPrimitive
        {
            get;
            set;
        }

        /// <summary>This is optional.</summary>
        [JsiiProperty("anotherOptional", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},\"optional\":true}", true)]
        public IDictionary<string, Value_> AnotherOptional
        {
            get;
            set;
        }

        [JsiiProperty("optionalAny", "{\"primitive\":\"any\",\"optional\":true}", true)]
        public object OptionalAny
        {
            get;
            set;
        }

        [JsiiProperty("optionalArray", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}", true)]
        public string[] OptionalArray
        {
            get;
            set;
        }

        /// <summary>An awesome number value</summary>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}", true)]
        public double Anumber
        {
            get;
            set;
        }

        /// <summary>A string value</summary>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}", true)]
        public string Astring
        {
            get;
            set;
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}", true)]
        public string[] FirstOptional
        {
            get;
            set;
        }
    }
}