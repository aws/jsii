using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents a concrete number.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Number), fullyQualifiedName: "@scope/jsii-calc-lib.Number", parametersJson: "[{\"docs\":{\"summary\":\"The number.\"},\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
    [System.Obsolete()]
    public class Number : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable
    {
        /// <summary>Creates a Number object.</summary>
        /// <param name="value">The number.</param>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [System.Obsolete()]
        public Number(double @value): base(new DeputyProps(new object[]{@value}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.Obsolete()]
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Number(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.Obsolete()]
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Number(DeputyProps props): base(props)
        {
        }

        /// <summary>The number multiplied by 2.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public virtual double DoubleValue
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>The number.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
