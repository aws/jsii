using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A struct which derives from another struct.</summary>
    [JsiiTypeProxy(nativeType: typeof(IDerivedStruct), fullyQualifiedName: "jsii-calc.DerivedStruct")]
    internal sealed class DerivedStructProxy : DeputyBase, IDerivedStruct
    {
        private DerivedStructProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "anotherRequired", typeJson: "{\"primitive\":\"date\"}")]
        public DateTime AnotherRequired
        {
            get => GetInstanceProperty<DateTime>();
        }

        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Bool
        {
            get => GetInstanceProperty<bool>();
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty(name: "nonPrimitive", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        public DoubleTrouble NonPrimitive
        {
            get => GetInstanceProperty<DoubleTrouble>();
        }

        /// <summary>This is optional.</summary>
        [JsiiProperty(name: "anotherOptional", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}", isOptional: true)]
        public IDictionary<string, Value_> AnotherOptional
        {
            get => GetInstanceProperty<IDictionary<string, Value_>>();
        }

        [JsiiProperty(name: "optionalAny", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        public object OptionalAny
        {
            get => GetInstanceProperty<object>();
        }

        [JsiiProperty(name: "optionalArray", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", isOptional: true)]
        public string[] OptionalArray
        {
            get => GetInstanceProperty<string[]>();
        }

        /// <summary>An awesome number value.</summary>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}")]
        public double Anumber
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>A string value.</summary>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}")]
        public string Astring
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", isOptional: true)]
        public string[] FirstOptional
        {
            get => GetInstanceProperty<string[]>();
        }
    }
}