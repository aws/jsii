using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <remarks>summary: Represents a concrete number.</remarks>
    [JsiiClass(typeof(Number), "@scope/jsii-calc-lib.Number", "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
    public class Number : Value_, IIDoublable
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

        /// <remarks>summary: The number multiplied by 2.</remarks>
        [JsiiProperty("doubleValue", "{\"primitive\":\"number\"}")]
        public virtual double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>summary: The number.</remarks>
        [JsiiProperty("value", "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}