using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: A struct which derives from another struct.</remarks>
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

        /// <remarks>summary: An example of a non primitive property.</remarks>
        [JsiiProperty("nonPrimitive", "{\"fqn\":\"jsii-calc.DoubleTrouble\"}", true)]
        public DoubleTrouble NonPrimitive
        {
            get;
            set;
        }

        /// <remarks>summary: This is optional.</remarks>
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

        /// <remarks>summary: An awesome number value.</remarks>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}", true)]
        public double Anumber
        {
            get;
            set;
        }

        /// <remarks>summary: A string value.</remarks>
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