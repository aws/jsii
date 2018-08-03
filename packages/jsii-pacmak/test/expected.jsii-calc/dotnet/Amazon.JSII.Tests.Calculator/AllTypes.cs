using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.composition;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.Calculator
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
            get => GetInstanceProperty<bool>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("stringProperty", "{\"primitive\":\"string\"}")]
        public virtual string StringProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("numberProperty", "{\"primitive\":\"number\"}")]
        public virtual double NumberProperty
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("dateProperty", "{\"primitive\":\"date\"}")]
        public virtual DateTime DateProperty
        {
            get => GetInstanceProperty<DateTime>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("jsonProperty", "{\"primitive\":\"json\"}")]
        public virtual JObject JsonProperty
        {
            get => GetInstanceProperty<JObject>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("mapProperty", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"number\"}}}")]
        public virtual IDictionary<string, double> MapProperty
        {
            get => GetInstanceProperty<IDictionary<string, double>>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("arrayProperty", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public virtual string[] ArrayProperty
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("anyProperty", "{\"primitive\":\"any\"}")]
        public virtual object AnyProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("anyArrayProperty", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\"}}}")]
        public virtual object[] AnyArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("anyMapProperty", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"any\"}}}")]
        public virtual IDictionary<string, object> AnyMapProperty
        {
            get => GetInstanceProperty<IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unionProperty", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.Multiply\"}]}}")]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unionArrayProperty", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.composition.CompositeOperation\"}]}}}}")]
        public virtual object[] UnionArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unionMapProperty", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]}}}}")]
        public virtual IDictionary<string, object> UnionMapProperty
        {
            get => GetInstanceProperty<IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("optionalEnumValue", "{\"fqn\":\"jsii-calc.StringEnum\",\"optional\":true}")]
        public virtual StringEnum OptionalEnumValue
        {
            get => GetInstanceProperty<StringEnum>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("enumProperty", "{\"fqn\":\"jsii-calc.AllTypesEnum\"}")]
        public virtual AllTypesEnum EnumProperty
        {
            get => GetInstanceProperty<AllTypesEnum>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("enumPropertyValue", "{\"primitive\":\"number\"}")]
        public virtual double EnumPropertyValue
        {
            get => GetInstanceProperty<double>();
        }

        [JsiiMethod("enumMethod", "{\"fqn\":\"jsii-calc.StringEnum\"}", "[{\"name\":\"value\",\"type\":{\"fqn\":\"jsii-calc.StringEnum\"}}]")]
        public virtual StringEnum EnumMethod(StringEnum value)
        {
            return InvokeInstanceMethod<StringEnum>(new object[]{value});
        }
    }
}