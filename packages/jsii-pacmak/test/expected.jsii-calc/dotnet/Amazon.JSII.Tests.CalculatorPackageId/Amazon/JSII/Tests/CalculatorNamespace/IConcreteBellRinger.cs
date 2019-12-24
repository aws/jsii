using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Takes the object parameter as a calss.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IConcreteBellRinger), fullyQualifiedName: "jsii-calc.IConcreteBellRinger")]
    public interface IConcreteBellRinger
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.Bell\"}}]")]
        void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.Bell bell);
    }
}
