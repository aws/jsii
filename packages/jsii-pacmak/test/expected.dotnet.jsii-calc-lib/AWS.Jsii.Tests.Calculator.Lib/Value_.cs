using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator.Lib
{
    /// <summary>Abstract class which represents a numeric value.</summary>
    [JsiiClass(typeof(Value_), "@scope/jsii-calc-lib.Value", "[]")]
    public abstract class Value_ : DeputyBase
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
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public virtual double Value
        {
            get => GetProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        [JsiiMethod("toString", "{\"primitive\":\"string\"}", "[]")]
        public override string ToString()
        {
            return InvokeMethod<string>(new object[]{});
        }

        /// <summary>Returns the name of the class (to verify native type names are created for derived classes).</summary>
        [JsiiMethod("typeName", "{\"primitive\":\"any\"}", "[]")]
        public virtual object TypeName()
        {
            return InvokeMethod<object>(new object[]{});
        }
    }
}