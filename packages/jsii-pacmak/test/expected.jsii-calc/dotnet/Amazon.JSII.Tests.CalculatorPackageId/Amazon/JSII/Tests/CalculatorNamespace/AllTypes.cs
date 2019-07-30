using Amazon.JSII.Runtime.Deputy;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This class includes property for all types supported by jsii.</summary>
    /// <remarks>
    /// The setters will validate
    /// that the value set is of the expected type and throw otherwise.
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(AllTypes), fullyQualifiedName: "jsii-calc.AllTypes")]
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

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "enumPropertyValue", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double EnumPropertyValue
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "anyArrayProperty", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\"}}}")]
        public virtual object[] AnyArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "anyMapProperty", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"any\"}}}")]
        public virtual IDictionary<string, object> AnyMapProperty
        {
            get => GetInstanceProperty<IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "anyProperty", typeJson: "{\"primitive\":\"any\"}")]
        public virtual object AnyProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "arrayProperty", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public virtual string[] ArrayProperty
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "booleanProperty", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool BooleanProperty
        {
            get => GetInstanceProperty<bool>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "dateProperty", typeJson: "{\"primitive\":\"date\"}")]
        public virtual DateTime DateProperty
        {
            get => GetInstanceProperty<DateTime>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "enumProperty", typeJson: "{\"fqn\":\"jsii-calc.AllTypesEnum\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum EnumProperty
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "jsonProperty", typeJson: "{\"primitive\":\"json\"}")]
        public virtual JObject JsonProperty
        {
            get => GetInstanceProperty<JObject>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "mapProperty", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Number\"}}}")]
        public virtual IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number> MapProperty
        {
            get => GetInstanceProperty<IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number>>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "numberProperty", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double NumberProperty
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "stringProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string StringProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "unionArrayProperty", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"@scope/jsii-calc-lib.Value\"}]}}}}")]
        public virtual object[] UnionArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "unionMapProperty", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"@scope/jsii-calc-lib.Number\"}]}}}}")]
        public virtual IDictionary<string, object> UnionMapProperty
        {
            get => GetInstanceProperty<IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.Multiply\"},{\"fqn\":\"@scope/jsii-calc-lib.Number\"}]}}")]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "unknownArrayProperty", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\"}}}")]
        public virtual object[] UnknownArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "unknownMapProperty", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"any\"}}}")]
        public virtual IDictionary<string, object> UnknownMapProperty
        {
            get => GetInstanceProperty<IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "unknownProperty", typeJson: "{\"primitive\":\"any\"}")]
        public virtual object UnknownProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "optionalEnumValue", typeJson: "{\"fqn\":\"jsii-calc.StringEnum\"}", isOptional: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.StringEnum? OptionalEnumValue
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.StringEnum? >();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "anyIn", parametersJson: "[{\"name\":\"inp\",\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void AnyIn(object inp)
        {
            InvokeInstanceVoidMethod(new object[]{inp});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "anyOut", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public virtual object AnyOut()
        {
            return InvokeInstanceMethod<object>(new object[]{});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "enumMethod", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.StringEnum\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"fqn\":\"jsii-calc.StringEnum\"}}]")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.StringEnum EnumMethod(Amazon.JSII.Tests.CalculatorNamespace.StringEnum value)
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.StringEnum>(new object[]{value});
        }
    }
}