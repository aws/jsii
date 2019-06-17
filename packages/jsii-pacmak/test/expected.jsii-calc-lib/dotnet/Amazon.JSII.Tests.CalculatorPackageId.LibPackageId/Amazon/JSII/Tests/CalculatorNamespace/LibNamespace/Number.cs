using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents a concrete number.</summary>
    /// <remarks>
    /// stability: deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Number), fullyQualifiedName: "@scope/jsii-calc-lib.Number", parametersJson: "[{\"docs\":{\"summary\":\"The number.\"},\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
    [System.Obsolete()]
    public class Number : Value_, IIDoublable
    {
        /// <summary>Creates a Number object.</summary>
        /// <param name = "@value">The number.</param>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [System.Obsolete()]
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
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public virtual double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>The number.</summary>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
