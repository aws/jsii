using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.composition;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>
    /// This class includes property for all types supported by jsii. The setters will validate
    /// that the value set is of the expected type and throw otherwise.
    /// </summary>
    [JsiiClass(typeof(AllTypes), "jsii-calc.AllTypes", "[]")]
    public class AllTypes : DeputyBase
    {
        public AllTypes(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AllTypes(ByRefValue reference): base(reference)
        {
        }

        protected AllTypes(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("booleanProperty", "{\"primitive\":\"boolean\"}")]
        public virtual bool BooleanProperty
        {
            get => GetProperty<bool>();
            set => SetProperty(value);
        }

        [JsiiProperty("stringProperty", "{\"primitive\":\"string\"}")]
        public virtual string StringProperty
        {
            get => GetProperty<string>();
            set => SetProperty(value);
        }

        [JsiiProperty("numberProperty", "{\"primitive\":\"number\"}")]
        public virtual double NumberProperty
        {
            get => GetProperty<double>();
            set => SetProperty(value);
        }

        [JsiiProperty("dateProperty", "{\"primitive\":\"date\"}")]
        public virtual DateTime DateProperty
        {
            get => GetProperty<DateTime>();
            set => SetProperty(value);
        }

        [JsiiProperty("jsonProperty", "{\"primitive\":\"json\"}")]
        public virtual JObject JsonProperty
        {
            get => GetProperty<JObject>();
            set => SetProperty(value);
        }

        [JsiiProperty("mapProperty", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"number\"}}}")]
        public virtual IDictionary<string, double> MapProperty
        {
            get => GetProperty<IDictionary<string, double>>();
            set => SetProperty(value);
        }

        [JsiiProperty("arrayProperty", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public virtual string[] ArrayProperty
        {
            get => GetProperty<string[]>();
            set => SetProperty(value);
        }

        [JsiiProperty("anyProperty", "{\"primitive\":\"any\"}")]
        public virtual object AnyProperty
        {
            get => GetProperty<object>();
            set => SetProperty(value);
        }

        [JsiiProperty("anyArrayProperty", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\"}}}")]
        public virtual object[] AnyArrayProperty
        {
            get => GetProperty<object[]>();
            set => SetProperty(value);
        }

        [JsiiProperty("anyMapProperty", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"any\"}}}")]
        public virtual IDictionary<string, object> AnyMapProperty
        {
            get => GetProperty<IDictionary<string, object>>();
            set => SetProperty(value);
        }

        [JsiiProperty("unionProperty", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.Multiply\"}]}}")]
        public virtual object UnionProperty
        {
            get => GetProperty<object>();
            set => SetProperty(value);
        }

        [JsiiProperty("unionArrayProperty", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.composition.CompositeOperation\"}]}}}}")]
        public virtual object[] UnionArrayProperty
        {
            get => GetProperty<object[]>();
            set => SetProperty(value);
        }

        [JsiiProperty("unionMapProperty", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]}}}}")]
        public virtual IDictionary<string, object> UnionMapProperty
        {
            get => GetProperty<IDictionary<string, object>>();
            set => SetProperty(value);
        }

        [JsiiProperty("enumProperty", "{\"fqn\":\"jsii-calc.AllTypesEnum\"}")]
        public virtual AllTypesEnum EnumProperty
        {
            get => GetProperty<AllTypesEnum>();
            set => SetProperty(value);
        }

        [JsiiProperty("enumPropertyValue", "{\"primitive\":\"number\"}")]
        public virtual double EnumPropertyValue
        {
            get => GetProperty<double>();
        }
    }
}