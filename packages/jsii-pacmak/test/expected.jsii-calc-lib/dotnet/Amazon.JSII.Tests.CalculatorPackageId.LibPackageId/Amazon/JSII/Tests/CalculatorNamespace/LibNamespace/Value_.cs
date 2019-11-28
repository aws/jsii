using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Abstract class which represents a numeric value.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_), fullyQualifiedName: "@scope/jsii-calc-lib.Value")]
    [System.Obsolete()]
    public abstract class Value_ : Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.Base
    {
        protected Value_(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Value_(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Value_(DeputyProps props): base(props)
        {
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        [System.Obsolete()]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>The value.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public virtual double Value
        {
            get => GetInstanceProperty<double>();
        }
    }
}
