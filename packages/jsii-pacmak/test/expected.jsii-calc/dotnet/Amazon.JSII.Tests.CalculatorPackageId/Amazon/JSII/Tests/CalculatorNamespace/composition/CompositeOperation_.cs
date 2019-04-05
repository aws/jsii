using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.composition
{
    /// <summary>Abstract operation composed from an expression of other operations.</summary>
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

        /// <summary>The expression that this operation consists of. Must be implemented by derived classes.</summary>
        [JsiiProperty("expression", "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}")]
        public virtual Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <summary>The value.</summary>
        [JsiiProperty("value", "{\"type\":{\"primitive\":\"number\"}}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>A set of postfixes to include in a decorated .toString().</summary>
        [JsiiProperty("decorationPostfixes", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}}}")]
        public virtual string[] DecorationPostfixes
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <summary>A set of prefixes to include in a decorated .toString().</summary>
        [JsiiProperty("decorationPrefixes", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}}}")]
        public virtual string[] DecorationPrefixes
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <summary>The .toString() style.</summary>
        [JsiiProperty("stringStyle", "{\"type\":{\"fqn\":\"jsii-calc.composition.CompositeOperation.CompositionStringStyle\"}}")]
        public virtual CompositionStringStyle StringStyle
        {
            get => GetInstanceProperty<CompositionStringStyle>();
            set => SetInstanceProperty(value);
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}