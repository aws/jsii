using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A struct which derives from another struct.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IDerivedStruct), fullyQualifiedName: "jsii-calc.DerivedStruct")]
    public interface IDerivedStruct : IMyFirstStruct
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "anotherRequired", typeJson: "{\"primitive\":\"date\"}")]
        DateTime AnotherRequired
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Bool
        {
            get;
        }

        /// <summary>An example of a non primitive property.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "nonPrimitive", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        DoubleTrouble NonPrimitive
        {
            get;
        }

        /// <summary>This is optional.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "anotherOptional", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}", isOptional: true)]
        IDictionary<string, Value_> AnotherOptional
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "optionalAny", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        object OptionalAny
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "optionalArray", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", isOptional: true)]
        string[] OptionalArray
        {
            get;
        }
    }
}