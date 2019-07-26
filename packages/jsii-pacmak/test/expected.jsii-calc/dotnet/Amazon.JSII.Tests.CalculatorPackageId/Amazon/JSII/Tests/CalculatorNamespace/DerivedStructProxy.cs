using Amazon.JSII.Runtime.Deputy;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A struct which derives from another struct.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(IDerivedStruct), fullyQualifiedName: "jsii-calc.DerivedStruct")]
    internal sealed class DerivedStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IDerivedStruct
    {
        private DerivedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "anotherRequired", typeJson: "{\"primitive\":\"date\"}")]
        public DateTime AnotherRequired
        {
            get => GetInstanceProperty<DateTime>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Bool
        {
            get => GetInstanceProperty<bool>();
        }

        /// <summary>An example of a non primitive property.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "nonPrimitive", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble NonPrimitive
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble>();
        }

        /// <summary>This is optional.</summary>
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "anotherOptional", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}", isOptional: true)]
        public IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_> AnotherOptional
        {
            get => GetInstanceProperty<IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "optionalAny", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        public object OptionalAny
        {
            get => GetInstanceProperty<object>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "optionalArray", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", isOptional: true)]
        public string[] OptionalArray
        {
            get => GetInstanceProperty<string[]>();
        }

        /// <summary>An awesome number value.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public double Anumber
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>A string value.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete()]
        public string Astring
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", isOptional: true)]
        [System.Obsolete()]
        public string[] FirstOptional
        {
            get => GetInstanceProperty<string[]>();
        }
    }
}