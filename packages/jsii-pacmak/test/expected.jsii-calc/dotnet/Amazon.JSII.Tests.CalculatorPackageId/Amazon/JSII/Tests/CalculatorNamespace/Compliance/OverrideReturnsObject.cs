using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.OverrideReturnsObject), fullyQualifiedName: "jsii-calc.compliance.OverrideReturnsObject")]
    public class OverrideReturnsObject : DeputyBase
    {
        public OverrideReturnsObject(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OverrideReturnsObject(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OverrideReturnsObject(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "test", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.compliance.IReturnsNumber\"}}]")]
        public virtual double Test(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IReturnsNumber obj)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IReturnsNumber)}, new object[]{obj});
        }
    }
}
