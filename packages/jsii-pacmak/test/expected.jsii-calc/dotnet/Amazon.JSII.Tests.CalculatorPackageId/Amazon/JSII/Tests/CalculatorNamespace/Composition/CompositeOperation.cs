using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Composition
{
    /// <summary>Abstract operation composed from an expression of other operations.</summary>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Composition.CompositeOperation), fullyQualifiedName: "jsii-calc.composition.CompositeOperation")]
    public abstract class CompositeOperation : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Operation
    {
        protected CompositeOperation(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected CompositeOperation(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected CompositeOperation(DeputyProps props): base(props)
        {
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>
        /// (deprecated)
        /// </remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>The expression that this operation consists of.</summary>
        /// <remarks>
        /// Must be implemented by derived classes.
        /// </remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public abstract Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get;
        }

        /// <summary>The value.</summary>
        /// <remarks>
        /// (deprecated)
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>A set of postfixes to include in a decorated .toString().</summary>
        [JsiiProperty(name: "decorationPostfixes", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public virtual string[] DecorationPostfixes
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <summary>A set of prefixes to include in a decorated .toString().</summary>
        [JsiiProperty(name: "decorationPrefixes", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public virtual string[] DecorationPrefixes
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <summary>The .toString() style.</summary>
        [JsiiProperty(name: "stringStyle", typeJson: "{\"fqn\":\"jsii-calc.composition.CompositeOperation.CompositionStringStyle\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Composition.CompositeOperation.CompositionStringStyle StringStyle
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Composition.CompositeOperation.CompositionStringStyle>();
            set => SetInstanceProperty(value);
        }

        /// <summary>Style of .toString() output for CompositeOperation.</summary>
        [JsiiEnum(nativeType: typeof(CompositionStringStyle), fullyQualifiedName: "jsii-calc.composition.CompositeOperation.CompositionStringStyle")]
        public enum CompositionStringStyle
        {
            /// <summary>Normal string expression.</summary>
            [JsiiEnumMember(name: "NORMAL")]
            NORMAL,
            /// <summary>Decorated string expression.</summary>
            [JsiiEnumMember(name: "DECORATED")]
            DECORATED
        }
    }
}
