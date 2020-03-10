using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>This class includes property for all types supported by jsii.</summary>
    /// <remarks>
    /// The setters will validate
    /// that the value set is of the expected type and throw otherwise.
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.AllTypes), fullyQualifiedName: "jsii-calc.compliance.AllTypes")]
    public class AllTypes : DeputyBase
    {
        public AllTypes(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AllTypes(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AllTypes(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyIn", parametersJson: "[{\"name\":\"inp\",\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void AnyIn(object inp)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(object)}, new object[]{inp});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyOut", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public virtual object AnyOut()
        {
            return InvokeInstanceMethod<object>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "enumMethod", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.StringEnum\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"fqn\":\"jsii-calc.compliance.StringEnum\"}}]")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.StringEnum EnumMethod(Amazon.JSII.Tests.CalculatorNamespace.Compliance.StringEnum @value)
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.StringEnum>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.StringEnum)}, new object[]{@value});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "enumPropertyValue", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double EnumPropertyValue
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "anyArrayProperty", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"array\"}}")]
        public virtual object[] AnyArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "anyMapProperty", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}")]
        public virtual System.Collections.Generic.IDictionary<string, object> AnyMapProperty
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "anyProperty", typeJson: "{\"primitive\":\"any\"}")]
        public virtual object AnyProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "arrayProperty", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public virtual string[] ArrayProperty
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "booleanProperty", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool BooleanProperty
        {
            get => GetInstanceProperty<bool>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "dateProperty", typeJson: "{\"primitive\":\"date\"}")]
        public virtual System.DateTime DateProperty
        {
            get => GetInstanceProperty<System.DateTime>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "enumProperty", typeJson: "{\"fqn\":\"jsii-calc.compliance.AllTypesEnum\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.AllTypesEnum EnumProperty
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Compliance.AllTypesEnum>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "jsonProperty", typeJson: "{\"primitive\":\"json\"}")]
        public virtual Newtonsoft.Json.Linq.JObject JsonProperty
        {
            get => GetInstanceProperty<Newtonsoft.Json.Linq.JObject>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "mapProperty", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Number\"},\"kind\":\"map\"}}")]
        public virtual System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number> MapProperty
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number>>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "numberProperty", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double NumberProperty
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "stringProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string StringProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "unionArrayProperty", typeJson: "{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"primitive\":\"number\"},{\"fqn\":\"@scope/jsii-calc-lib.Value\"}]}},\"kind\":\"array\"}}")]
        public virtual object[] UnionArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "unionMapProperty", typeJson: "{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"@scope/jsii-calc-lib.Number\"}]}},\"kind\":\"map\"}}")]
        public virtual System.Collections.Generic.IDictionary<string, object> UnionMapProperty
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.Multiply\"},{\"fqn\":\"@scope/jsii-calc-lib.Number\"}]}}")]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "unknownArrayProperty", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"array\"}}")]
        public virtual object[] UnknownArrayProperty
        {
            get => GetInstanceProperty<object[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "unknownMapProperty", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}")]
        public virtual System.Collections.Generic.IDictionary<string, object> UnknownMapProperty
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, object>>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "unknownProperty", typeJson: "{\"primitive\":\"any\"}")]
        public virtual object UnknownProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalEnumValue", typeJson: "{\"fqn\":\"jsii-calc.compliance.StringEnum\"}", isOptional: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.StringEnum? OptionalEnumValue
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Compliance.StringEnum?>();
            set => SetInstanceProperty(value);
        }
    }
}
