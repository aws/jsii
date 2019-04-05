using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Abstract class which represents a numeric value.</summary>
    [JsiiClass(typeof(Value_), "@scope/jsii-calc-lib.Value", "[]")]
    public abstract class Value_ : Base
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

        /// <summary>The value.</summary>
        [JsiiProperty("value", "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}