using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.composition
{
    /// <summary>Abstract operation composed from an expression of other operations.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation), fullyQualifiedName: "jsii-calc.composition.CompositeOperation")]
    public abstract class CompositeOperation : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Operation
    {
        protected CompositeOperation(): base(new DeputyProps(new object[]{}))
        {
        }

        protected CompositeOperation(ByRefValue reference): base(reference)
        {
        }

        protected CompositeOperation(DeputyProps props): base(props)
        {
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>The expression that this operation consists of. Must be implemented by derived classes.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>The value.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>A set of postfixes to include in a decorated .toString().</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "decorationPostfixes", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public virtual string[] DecorationPostfixes
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <summary>A set of prefixes to include in a decorated .toString().</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "decorationPrefixes", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public virtual string[] DecorationPrefixes
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <summary>The .toString() style.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "stringStyle", typeJson: "{\"fqn\":\"jsii-calc.composition.CompositeOperation.CompositionStringStyle\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation.CompositionStringStyle StringStyle
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation.CompositionStringStyle>();
            set => SetInstanceProperty(value);
        }

        /// <summary>Style of .toString() output for CompositeOperation.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiEnum(nativeType: typeof(CompositionStringStyle), fullyQualifiedName: "jsii-calc.composition.CompositeOperation.CompositionStringStyle")]
        public enum CompositionStringStyle
        {
            /// <summary>Normal string expression.</summary>
            /// <remarks>
            /// stability: Experimental
            /// </remarks>
            [JsiiEnumMember(name: "NORMAL")]
            NORMAL,
            /// <summary>Decorated string expression.</summary>
            /// <remarks>
            /// stability: Experimental
            /// </remarks>
            [JsiiEnumMember(name: "DECORATED")]
            DECORATED
        }
    }
}
