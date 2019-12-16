using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Takes the object parameter as a calss.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IConcreteBellRinger), fullyQualifiedName: "jsii-calc.IConcreteBellRinger")]
    internal sealed class IConcreteBellRingerProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger
    {
        private IConcreteBellRingerProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <param name="bell"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "yourTurn", parametersJson: "[{\"name\":\"bell\",\"type\":{\"fqn\":\"jsii-calc.Bell\"}}]")]
        public void YourTurn(Amazon.JSII.Tests.CalculatorNamespace.Bell bell)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Bell)}, new object[]{bell});
        }
    }
}
