using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Takes the object parameter as an interface.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IBellRinger), fullyQualifiedName: "jsii-calc.IBellRinger")]
    public interface IBellRinger
    {
        /// <summary></summary>
        /// <param name="bell"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.IBell\"}}]")]
        void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.IBell bell);
    }
}
