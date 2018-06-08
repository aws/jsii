using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator.Lib
{
    /// <summary>Represents a concrete number.</summary>
    [JsiiClass("jsii-calc-lib", "jsii$jsii_calc_lib$.Number", "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
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
            get => GetProperty<double>();
        }

        /// <summary>The number multiplied by 2.</summary>
        [JsiiProperty("doubleValue", "{\"primitive\":\"number\"}")]
        public virtual double DoubleValue
        {
            get => GetProperty<double>();
        }
    }
}