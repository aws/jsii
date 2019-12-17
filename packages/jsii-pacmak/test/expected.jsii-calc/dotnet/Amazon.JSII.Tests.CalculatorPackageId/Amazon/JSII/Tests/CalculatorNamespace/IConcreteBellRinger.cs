using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Takes the object parameter as a calss.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IConcreteBellRinger), fullyQualifiedName: "jsii-calc.IConcreteBellRinger")]
    public interface IConcreteBellRinger
    {
        /// <summary></summary>
        /// <param name="bell"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.Bell\"}}]")]
        void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.Bell bell);
    }
}
