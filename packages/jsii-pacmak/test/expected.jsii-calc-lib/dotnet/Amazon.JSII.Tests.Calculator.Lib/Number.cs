using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.Lib
{
    /// <summary>Represents a concrete number.</summary>
    [JsiiClass(typeof(Number), "@scope/jsii-calc-lib.Number", "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
    public class Number : Value_
    {
        public Number(double value): base(new DeputyProps(new object[]{value}))
        {
        }

        protected Number(ByRefValue reference): base(reference)
        {
        }

        protected Number(DeputyProps props): base(props)
        {
        }

        /// <summary>The number.</summary>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>The number multiplied by 2.</summary>
        [JsiiProperty("doubleValue", "{\"primitive\":\"number\"}")]
        public virtual double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }
    }
}