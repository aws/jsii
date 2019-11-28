using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.RootStructValidator), fullyQualifiedName: "jsii-calc.RootStructValidator")]
    public class RootStructValidator : DeputyBase
    {
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected RootStructValidator(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected RootStructValidator(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "validate", parametersJson: "[{\"name\":\"struct\",\"type\":{\"fqn\":\"jsii-calc.RootStruct\"}}]")]
        public static void Validate(Amazon.JSII.Tests.CalculatorNamespace.IRootStruct @struct)
        {
            InvokeStaticVoidMethod(typeof(Amazon.JSII.Tests.CalculatorNamespace.RootStructValidator), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IRootStruct)}, new object[]{@struct});
        }
    }
}
