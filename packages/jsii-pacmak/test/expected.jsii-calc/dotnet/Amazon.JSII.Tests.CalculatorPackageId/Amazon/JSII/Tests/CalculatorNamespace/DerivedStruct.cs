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
        [JsiiProperty(name: "anotherRequired", typeJson: "{\"primitive\":\"date\"}", isOverride: true)]
        public DateTime AnotherRequired
        {
            get;
            set;
        }

        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}", isOverride: true)]
        public bool Bool
        {
            get;
            set;
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty(name: "nonPrimitive", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}", isOverride: true)]
        public DoubleTrouble NonPrimitive
        {
            get;
            set;
        }

        /// <summary>This is optional.</summary>
        [JsiiProperty(name: "anotherOptional", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}", isOptional: true, isOverride: true)]
        public IDictionary<string, Value_> AnotherOptional
        {
            get;
            set;
        }

        [JsiiProperty(name: "optionalAny", typeJson: "{\"primitive\":\"any\"}", isOptional: true, isOverride: true)]
        public object OptionalAny
        {
            get;
            set;
        }

        [JsiiProperty(name: "optionalArray", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", isOptional: true, isOverride: true)]
        public string[] OptionalArray
        {
            get;
            set;
        }

        /// <summary>An awesome number value.</summary>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}", isOverride: true)]
        public double Anumber
        {
            get;
            set;
        }

        /// <summary>A string value.</summary>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Astring
        {
            get;
            set;
        }

        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", isOptional: true, isOverride: true)]
        public string[] FirstOptional
        {
            get;
            set;
        }
    }
}