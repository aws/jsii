using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents an operation on values.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Operation), fullyQualifiedName: "@scope/jsii-calc-lib.Operation")]
    [System.Obsolete()]
    public abstract class Operation : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_
    {
        protected Operation(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Operation(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Operation(DeputyProps props): base(props)
        {
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        [System.Obsolete()]
        public override abstract string ToString();

    }
}
