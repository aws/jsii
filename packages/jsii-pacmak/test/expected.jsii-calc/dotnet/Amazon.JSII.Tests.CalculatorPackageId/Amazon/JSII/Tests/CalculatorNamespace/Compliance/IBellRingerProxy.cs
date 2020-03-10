using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Takes the object parameter as an interface.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IBellRinger), fullyQualifiedName: "jsii-calc.compliance.IBellRinger")]
    internal sealed class IBellRingerProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBellRinger
    {
        private IBellRingerProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.compliance.IBell\"}}]")]
        public void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBell bell)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBell)}, new object[]{bell});
        }
    }
}
