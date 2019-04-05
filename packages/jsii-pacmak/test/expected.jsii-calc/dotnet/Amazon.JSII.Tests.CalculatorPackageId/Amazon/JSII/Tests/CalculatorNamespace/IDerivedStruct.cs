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
        /// <summary>This is optional.</summary>
        [JsiiProperty("anotherOptional", "{\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}},\"optional\":true}")]
        IDictionary<string, Value_> AnotherOptional
        {
            get;
        }

        [JsiiProperty("anotherRequired", "{\"type\":{\"primitive\":\"date\"}}")]
        DateTime AnotherRequired
        {
            get;
        }

        [JsiiProperty("bool", "{\"type\":{\"primitive\":\"boolean\"}}")]
        bool Bool
        {
            get;
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty("nonPrimitive", "{\"type\":{\"fqn\":\"jsii-calc.DoubleTrouble\"}}")]
        DoubleTrouble NonPrimitive
        {
            get;
        }

        [JsiiProperty("optionalAny", "{\"type\":{\"primitive\":\"any\"},\"optional\":true}")]
        object OptionalAny
        {
            get;
        }

        [JsiiProperty("optionalArray", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}},\"optional\":true}")]
        string[] OptionalArray
        {
            get;
        }
    }
}