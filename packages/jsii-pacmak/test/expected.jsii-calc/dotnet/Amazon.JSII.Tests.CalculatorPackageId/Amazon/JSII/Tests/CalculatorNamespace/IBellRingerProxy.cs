using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Takes the object parameter as an interface.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IBellRinger), fullyQualifiedName: "jsii-calc.IBellRinger")]
    internal sealed class IBellRingerProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IBellRinger
    {
        private IBellRingerProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <param name="bell"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.IBell\"}}]")]
        public void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.IBell bell)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBell)}, new object[]{bell});
        }
    }
}
