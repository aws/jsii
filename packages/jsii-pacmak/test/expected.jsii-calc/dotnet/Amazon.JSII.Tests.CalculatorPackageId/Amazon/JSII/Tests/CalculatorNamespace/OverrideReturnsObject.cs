using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OverrideReturnsObject), fullyQualifiedName: "jsii-calc.OverrideReturnsObject")]
    public class OverrideReturnsObject : DeputyBase
    {
        public OverrideReturnsObject(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OverrideReturnsObject(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OverrideReturnsObject(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "test", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IReturnsNumber\"}}]")]
        public virtual double Test(Amazon.JSII.Tests.CalculatorNamespace.IReturnsNumber obj)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IReturnsNumber)}, new object[]{obj});
        }
    }
}
