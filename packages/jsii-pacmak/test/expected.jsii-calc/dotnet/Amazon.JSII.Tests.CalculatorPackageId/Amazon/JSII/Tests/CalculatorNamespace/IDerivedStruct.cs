using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A struct which derives from another struct.</summary>
    [JsiiInterface(typeof(IDerivedStruct), "jsii-calc.DerivedStruct")]
    public interface IDerivedStruct : IMyFirstStruct
    {
        [JsiiProperty("anotherRequired", "{\"primitive\":\"date\"}")]
        DateTime AnotherRequired
        {
            get;
        }

        [JsiiProperty("bool", "{\"primitive\":\"boolean\"}")]
        bool Bool
        {
            get;
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty("nonPrimitive", "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        DoubleTrouble NonPrimitive
        {
            get;
        }

        /// <summary>This is optional.</summary>
        [JsiiProperty("anotherOptional", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},\"optional\":true}")]
        IDictionary<string, Value_> AnotherOptional
        {
            get;
        }

        [JsiiProperty("optionalAny", "{\"primitive\":\"any\",\"optional\":true}")]
        object OptionalAny
        {
            get;
        }

        [JsiiProperty("optionalArray", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        string[] OptionalArray
        {
            get;
        }
    }
}