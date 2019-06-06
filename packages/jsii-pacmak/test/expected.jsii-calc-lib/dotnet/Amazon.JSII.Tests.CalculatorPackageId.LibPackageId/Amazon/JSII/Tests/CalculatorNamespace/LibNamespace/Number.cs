using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents a concrete number.</summary>
    /// <remarks>stability: Deprecated</remarks>
    [JsiiClass(nativeType: typeof(Number), fullyQualifiedName: "@scope/jsii-calc-lib.Number", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
    [System.Obsolete()]
    public class Number : Value_, IIDoublable
    {
        /// <summary>Creates a Number object.</summary>
        /// <param name = "value">The number.</param>
        /// <remarks>stability: Deprecated</remarks>
        [System.Obsolete()]
        public Number(double value): base(new DeputyProps(new object[]{value}))
        {
        }

        [System.Obsolete()]
        protected Number(ByRefValue reference): base(reference)
        {
        }

        [System.Obsolete()]
        protected Number(DeputyProps props): base(props)
        {
        }

        /// <summary>The number multiplied by 2.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public virtual double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>The number.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}