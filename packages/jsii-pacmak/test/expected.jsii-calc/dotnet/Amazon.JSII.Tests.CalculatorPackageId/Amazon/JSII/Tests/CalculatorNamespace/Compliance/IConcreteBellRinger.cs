using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Takes the object parameter as a calss.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IConcreteBellRinger), fullyQualifiedName: "jsii-calc.compliance.IConcreteBellRinger")]
    public interface IConcreteBellRinger
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.compliance.Bell\"}}]")]
        void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.Compliance.Bell bell);
    }
}
