using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConsumePureInterface), fullyQualifiedName: "jsii-calc.compliance.ConsumePureInterface", parametersJson: "[{\"name\":\"delegate\",\"type\":{\"fqn\":\"jsii-calc.compliance.IStructReturningDelegate\"}}]")]
    public class ConsumePureInterface : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public ConsumePureInterface(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructReturningDelegate @delegate): base(new DeputyProps(new object[]{@delegate}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConsumePureInterface(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConsumePureInterface(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "workItBaby", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.StructB\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructB WorkItBaby()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructB>(new System.Type[]{}, new object[]{});
        }
    }
}
