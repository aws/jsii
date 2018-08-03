using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.Lib;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>A struct which derives from another struct.</summary>
    [JsiiInterfaceProxy(typeof(IDerivedStruct), "jsii-calc.DerivedStruct")]
    internal class DerivedStructProxy : DeputyBase, IDerivedStruct
    {
        private DerivedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty("nonPrimitive", "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        public virtual DoubleTrouble NonPrimitive
        {
            get => GetInstanceProperty<DoubleTrouble>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("bool", "{\"primitive\":\"boolean\"}")]
        public virtual bool Bool
        {
            get => GetInstanceProperty<bool>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("anotherRequired", "{\"primitive\":\"date\"}")]
        public virtual DateTime AnotherRequired
        {
            get => GetInstanceProperty<DateTime>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("optionalArray", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        public virtual string[] OptionalArray
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <summary>This is optional.</summary>
        [JsiiProperty("anotherOptional", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}},\"optional\":true}")]
        public virtual IDictionary<string, Value_> AnotherOptional
        {
            get => GetInstanceProperty<IDictionary<string, Value_>>();
            set => SetInstanceProperty(value);
        }

        /// <summary>A string value</summary>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}")]
        public virtual string Astring
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <summary>An awesome number value</summary>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}")]
        public virtual double Anumber
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        public virtual string[] FirstOptional
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }
    }
}