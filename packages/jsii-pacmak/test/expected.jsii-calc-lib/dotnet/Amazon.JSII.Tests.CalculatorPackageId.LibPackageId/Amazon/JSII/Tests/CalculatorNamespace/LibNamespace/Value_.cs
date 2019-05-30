using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Abstract class which represents a numeric value.</summary>
    [JsiiClass(nativeType: typeof(Value_), fullyQualifiedName: "@scope/jsii-calc-lib.Value")]
    public abstract class Value_ : Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.Base
    {
        protected Value_(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Value_(ByRefValue reference): base(reference)
        {
        }

        protected Value_(DeputyProps props): base(props)
        {
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>The value.</summary>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
