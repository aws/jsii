using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: A struct which derives from another struct.</remarks>
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

        /// <remarks>summary: An example of a non primitive property.</remarks>
        [JsiiProperty("nonPrimitive", "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        DoubleTrouble NonPrimitive
        {
            get;
        }

        /// <remarks>summary: This is optional.</remarks>
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