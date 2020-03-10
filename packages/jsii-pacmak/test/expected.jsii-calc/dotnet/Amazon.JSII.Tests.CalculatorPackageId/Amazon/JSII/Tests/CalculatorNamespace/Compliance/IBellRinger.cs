using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Takes the object parameter as an interface.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IBellRinger), fullyQualifiedName: "jsii-calc.compliance.IBellRinger")]
    public interface IBellRinger
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.compliance.IBell\"}}]")]
        void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBell bell);
    }
}
