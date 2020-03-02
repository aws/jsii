using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.RootStructValidator), fullyQualifiedName: "jsii-calc.RootStructValidator")]
    public class RootStructValidator : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected RootStructValidator(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
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
