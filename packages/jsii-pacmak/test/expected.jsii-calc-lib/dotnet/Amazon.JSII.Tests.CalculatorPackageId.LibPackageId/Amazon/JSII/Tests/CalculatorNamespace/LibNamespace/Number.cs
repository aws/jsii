using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents a concrete number.</summary>
    [JsiiClass(nativeType: typeof(Number), fullyQualifiedName: "@scope/jsii-calc-lib.Number", parametersJson: "[{\"docs\":{\"summary\":\"The number.\"},\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
    public class Number : Value_, IIDoublable
    {
        public Number(double @value): base(new DeputyProps(new object[]{@value}))
        {
        }

        protected Number(ByRefValue reference): base(reference)
        {
        }

        protected Number(DeputyProps props): base(props)
        {
        }

        /// <summary>The number multiplied by 2.</summary>
        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>The number.</summary>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
