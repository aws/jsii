using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents an operation on values.</summary>
    [JsiiClass(nativeType: typeof(Operation), fullyQualifiedName: "@scope/jsii-calc-lib.Operation")]
    public abstract class Operation : Value_
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
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public override abstract string ToString();

    }
}
