using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>A struct which derives from another struct.</summary>
    [JsiiInterfaceProxy("jsii-calc", "jsii$jsii_calc$.DerivedStruct")]
    internal class DerivedStructProxy : DeputyBase, IDerivedStruct
    {
        private DerivedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty("nonPrimitive", "{\"fqn\":\"jsii$jsii_calc$.DoubleTrouble\"}")]
        public virtual DoubleTrouble NonPrimitive
        {
            get => GetProperty<DoubleTrouble>();
            set => SetProperty(value);
        }

        [JsiiProperty("bool", "{\"primitive\":\"boolean\"}")]
        public virtual bool Bool
        {
            get => GetProperty<bool>();
            set => SetProperty(value);
        }

        [JsiiProperty("anotherRequired", "{\"primitive\":\"date\"}")]
        public virtual DateTime AnotherRequired
        {
            get => GetProperty<DateTime>();
            set => SetProperty(value);
        }

        [JsiiProperty("optionalArray", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        public virtual string[] OptionalArray
        {
            get => GetProperty<string[]>();
            set => SetProperty(value);
        }

        /// <summary>This is optional.</summary>
        [JsiiProperty("anotherOptional", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"jsii$jsii_calc_lib$.Value\"}},\"optional\":true}")]
        public virtual IDictionary<string, Value_> AnotherOptional
        {
            get => GetProperty<IDictionary<string, Value_>>();
            set => SetProperty(value);
        }

        /// <summary>A string value</summary>
        [JsiiProperty("astring", "{\"primitive\":\"string\"}")]
        public virtual string Astring
        {
            get => GetProperty<string>();
            set => SetProperty(value);
        }

        /// <summary>An awesome number value</summary>
        [JsiiProperty("anumber", "{\"primitive\":\"number\"}")]
        public virtual double Anumber
        {
            get => GetProperty<double>();
            set => SetProperty(value);
        }

        [JsiiProperty("firstOptional", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}},\"optional\":true}")]
        public virtual string[] FirstOptional
        {
            get => GetProperty<string[]>();
            set => SetProperty(value);
        }
    }
}