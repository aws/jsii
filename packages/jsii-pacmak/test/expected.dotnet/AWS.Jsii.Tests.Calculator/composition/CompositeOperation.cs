using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator.composition
{
    /// <summary>Abstract operation composed from an expression of other operations.</summary>
    [JsiiClass(typeof(CompositeOperation), "jsii-calc.composition.CompositeOperation", "[]")]
    public abstract class CompositeOperation : Operation
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

        /// <summary>The .toString() style.</summary>
        [JsiiProperty("stringStyle", "{\"fqn\":\"jsii-calc.composition.CompositionStringStyle\"}")]
        public virtual CompositionStringStyle StringStyle
        {
            get => GetProperty<CompositionStringStyle>();
            set => SetProperty(value);
        }

        /// <summary>A set of prefixes to include in a decorated .toString().</summary>
        [JsiiProperty("decorationPrefixes", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public virtual string[] DecorationPrefixes
        {
            get => GetProperty<string[]>();
            set => SetProperty(value);
        }

        /// <summary>A set of postfixes to include in a decorated .toString().</summary>
        [JsiiProperty("decorationPostfixes", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public virtual string[] DecorationPostfixes
        {
            get => GetProperty<string[]>();
            set => SetProperty(value);
        }

        /// <summary>The value.</summary>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetProperty<double>();
        }

        /// <summary>
        /// The expression that this operation consists of.
        /// Must be implemented by derived classes.
        /// </summary>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Expression
        {
            get => GetProperty<Value_>();
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override string ToString()
        {
            return InvokeMethod<string>(new object[]{});
        }
    }
}