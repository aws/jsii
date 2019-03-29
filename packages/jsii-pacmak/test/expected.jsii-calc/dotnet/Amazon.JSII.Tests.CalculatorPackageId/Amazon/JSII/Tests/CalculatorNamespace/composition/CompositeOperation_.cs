using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.composition
{
    /// <remarks>summary: Abstract operation composed from an expression of other operations.</remarks>
    [JsiiClass(typeof(CompositeOperation_), "jsii-calc.composition.CompositeOperation", "[]")]
    public abstract class CompositeOperation_ : Operation
    {
        protected CompositeOperation_(): base(new DeputyProps(new object[]{}))
        {
        }

        protected CompositeOperation_(ByRefValue reference): base(reference)
        {
        }

        protected CompositeOperation_(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// remarks: Must be implemented by derived classes.
        /// summary: The expression that this operation consists of.
        /// </remarks>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <remarks>summary: The value.</remarks>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// remarks: toString().
        /// summary: A set of postfixes to include in a decorated .
        /// </remarks>
        [JsiiProperty("decorationPostfixes", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public virtual string[] DecorationPostfixes
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// remarks: toString().
        /// summary: A set of prefixes to include in a decorated .
        /// </remarks>
        [JsiiProperty("decorationPrefixes", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public virtual string[] DecorationPrefixes
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// remarks: toString() style.
        /// summary: The .
        /// </remarks>
        [JsiiProperty("stringStyle", "{\"fqn\":\"jsii-calc.composition.CompositeOperation.CompositionStringStyle\"}")]
        public virtual CompositionStringStyle StringStyle
        {
            get => GetInstanceProperty<CompositionStringStyle>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>summary: String representation of the value.</remarks>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}