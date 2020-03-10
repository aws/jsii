using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>A struct which derives from another struct.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDerivedStruct), fullyQualifiedName: "jsii-calc.compliance.DerivedStruct")]
    internal sealed class DerivedStructProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDerivedStruct
    {
        private DerivedStructProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "anotherRequired", typeJson: "{\"primitive\":\"date\"}")]
        public System.DateTime AnotherRequired
        {
            get => GetInstanceProperty<System.DateTime>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Bool
        {
            get => GetInstanceProperty<bool>();
        }

        /// <summary>An example of a non primitive property.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "nonPrimitive", typeJson: "{\"fqn\":\"jsii-calc.compliance.DoubleTrouble\"}")]
        public Amazon.JSII.Tests.CalculatorNamespace.Compliance.DoubleTrouble NonPrimitive
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Compliance.DoubleTrouble>();
        }

        /// <summary>This is optional.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "anotherOptional", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"map\"}}", isOptional: true)]
        public System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>? AnotherOptional
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>?>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalAny", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        public object? OptionalAny
        {
            get => GetInstanceProperty<object?>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalArray", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true)]
        public string[]? OptionalArray
        {
            get => GetInstanceProperty<string[]?>();
        }

        /// <summary>An awesome number value.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public double Anumber
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>A string value.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete()]
        public string Astring
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true)]
        [System.Obsolete()]
        public string[]? FirstOptional
        {
            get => GetInstanceProperty<string[]?>();
        }
    }
}
