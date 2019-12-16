using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents an operation on values.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Operation), fullyQualifiedName: "@scope/jsii-calc-lib.Operation")]
    [System.Obsolete()]
    public abstract class Operation : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_
    {
        /// <summary></summary>
        protected Operation(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected Operation(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected Operation(DeputyProps props): base(props)
        {
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        [System.Obsolete()]
        public override abstract string ToString();

    }
}
