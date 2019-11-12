using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.RootStructValidator), fullyQualifiedName: "jsii-calc.RootStructValidator")]
    public class RootStructValidator : DeputyBase
    {
        protected RootStructValidator(ByRefValue reference): base(reference)
        {
        }

        protected RootStructValidator(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "validate", parametersJson: "[{\"name\":\"struct\",\"type\":{\"fqn\":\"jsii-calc.RootStruct\"}}]")]
        public static void Validate(Amazon.JSII.Tests.CalculatorNamespace.IRootStruct @struct)
        {
            InvokeStaticVoidMethod(typeof(Amazon.JSII.Tests.CalculatorNamespace.RootStructValidator), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IRootStruct)}, new object[]{@struct});
        }
    }
}
