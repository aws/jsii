using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.Lib;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>A struct which derives from another struct.</summary>
    [JsiiInterface(typeof(IDerivedStruct), "jsii-calc.DerivedStruct")]
    public interface IDerivedStruct : IMyFirstStruct
    {
        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty("nonPrimitive", "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        DoubleTrouble NonPrimitive
        {
            get;
            set;
        }

        [JsiiProperty("bool", "{\"primitive\":\"boolean\"}")]
        bool Bool
        {
            get;
            set;
        }

        [JsiiProperty("anotherRequired", "{\"primitive\":\"date\"}")]
        DateTime AnotherRequired
        {
            get;
            set;
        }

        [JsiiProperty("optionalArray", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        string[] OptionalArray
        {
            get;
            set;
        }

        /// <summary>This is optional.</summary>
        [JsiiProperty("anotherOptional", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},\"optional\":true}")]
        IDictionary<string, Value_> AnotherOptional
        {
            get;
            set;
        }
    }
}