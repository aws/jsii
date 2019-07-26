using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents an operation on values.</summary>
    /// <remarks>stability: Deprecated</remarks>
    [JsiiClass(nativeType: typeof(Operation), fullyQualifiedName: "@scope/jsii-calc-lib.Operation")]
    [System.Obsolete()]
    public abstract class Operation : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_
    {
        protected Operation(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Operation(ByRefValue reference): base(reference)
        {
        }

        protected Operation(DeputyProps props): base(props)
        {
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        [System.Obsolete()]
        public override abstract string ToString();
    }
}