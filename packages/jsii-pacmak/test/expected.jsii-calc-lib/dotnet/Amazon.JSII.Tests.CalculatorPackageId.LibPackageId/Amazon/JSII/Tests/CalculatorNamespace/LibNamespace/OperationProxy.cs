using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Represents an operation on values.</summary>
    /// <remarks>stability: Deprecated</remarks>
    [JsiiTypeProxy(nativeType: typeof(Operation), fullyQualifiedName: "@scope/jsii-calc-lib.Operation")]
    [System.Obsolete()]
    internal sealed class OperationProxy : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Operation
    {
        private OperationProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The value.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        public override double Value
        {
            get => GetInstanceProperty<double>();
        }

        /// <summary>String representation of the value.</summary>
        /// <remarks>stability: Deprecated</remarks>
        [JsiiMethod(name: "toString", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        [System.Obsolete()]
        public override string ToString()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}