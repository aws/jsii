using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This class includes property for all types supported by jsii.</summary>
    /// <remarks>
    /// The setters will validate
    /// that the value set is of the expected type and throw otherwise.
    /// </remarks>
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

        [JsiiProperty("enumPropertyValue", "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double EnumPropertyValue
        {
            get => GetInstanceProperty<double>();
        }

        [JsiiProperty("anyArrayProperty", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"any\"},\"optional\":true}}}}")]
        public virtual object[] AnyArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("anyMapProperty", "{\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"type\":{\"primitive\":\"any\"},\"optional\":true}}}}")]
        public virtual IDictionary<string, object> AnyMapProperty
        {
            get => GetInstanceProperty<IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("anyProperty", "{\"type\":{\"primitive\":\"any\"},\"optional\":true}")]
        public virtual object AnyProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("arrayProperty", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}}}")]
        public virtual string[] ArrayProperty
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("booleanProperty", "{\"type\":{\"primitive\":\"boolean\"}}")]
        public virtual bool BooleanProperty
        {
            get => GetInstanceProperty<bool>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("dateProperty", "{\"type\":{\"primitive\":\"date\"}}")]
        public virtual DateTime DateProperty
        {
            get => GetInstanceProperty<DateTime>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("enumProperty", "{\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}")]
        public virtual AllTypesEnum EnumProperty
        {
            get => GetInstanceProperty<AllTypesEnum>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("jsonProperty", "{\"type\":{\"primitive\":\"json\"}}")]
        public virtual JObject JsonProperty
        {
            get => GetInstanceProperty<JObject>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("mapProperty", "{\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Number\"}}}}}")]
        public virtual IDictionary<string, Number> MapProperty
        {
            get => GetInstanceProperty<IDictionary<string, Number>>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("numberProperty", "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NumberProperty
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("optionalEnumValue", "{\"type\":{\"fqn\":\"jsii-calc.StringEnum\"},\"optional\":true}")]
        public virtual StringEnum? OptionalEnumValue
        {
            get => GetInstanceProperty<StringEnum? >();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("stringProperty", "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string StringProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unionArrayProperty", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"number\"}},{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}]}}}}}}")]
        public virtual object[] UnionArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unionMapProperty", "{\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"string\"}},{\"type\":{\"primitive\":\"number\"}},{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Number\"}}]}}}}}}")]
        public virtual IDictionary<string, object> UnionMapProperty
        {
            get => GetInstanceProperty<IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unionProperty", "{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"string\"}},{\"type\":{\"primitive\":\"number\"}},{\"type\":{\"fqn\":\"jsii-calc.Multiply\"}},{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Number\"}}]}}}")]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unknownArrayProperty", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"any\"},\"optional\":true}}}}")]
        public virtual object[] UnknownArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unknownMapProperty", "{\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"type\":{\"primitive\":\"any\"},\"optional\":true}}}}")]
        public virtual IDictionary<string, object> UnknownMapProperty
        {
            get => GetInstanceProperty<IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("unknownProperty", "{\"type\":{\"primitive\":\"any\"},\"optional\":true}")]
        public virtual object UnknownProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod("anyIn", null, "[{\"name\":\"inp\",\"value\":{\"type\":{\"primitive\":\"any\"},\"optional\":true}}]")]
        public virtual void AnyIn(object inp)
        {
            InvokeInstanceVoidMethod(new object[]{inp});
        }

        [JsiiMethod("anyOut", "{\"type\":{\"primitive\":\"any\"},\"optional\":true}", "[]")]
        public virtual object AnyOut()
        {
            return InvokeInstanceMethod<object>(new object[]{});
        }

        [JsiiMethod("enumMethod", "{\"type\":{\"fqn\":\"jsii-calc.StringEnum\"}}", "[{\"name\":\"value\",\"value\":{\"type\":{\"fqn\":\"jsii-calc.StringEnum\"}}}]")]
        public virtual StringEnum EnumMethod(StringEnum value)
        {
            return InvokeInstanceMethod<StringEnum>(new object[]{value});
        }
    }
}