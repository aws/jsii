using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Takes the object parameter as a calss.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IConcreteBellRinger), fullyQualifiedName: "jsii-calc.IConcreteBellRinger")]
    internal sealed class IConcreteBellRingerProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger
    {
        private IConcreteBellRingerProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.Bell\"}}]")]
        public void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.Bell bell)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Bell)}, new object[]{bell});
        }
    }
}
