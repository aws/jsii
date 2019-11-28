using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble), fullyQualifiedName: "jsii-calc.DoubleTrouble")]
    public class DoubleTrouble : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IFriendlyRandomGenerator
    {
        public DoubleTrouble(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DoubleTrouble(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DoubleTrouble(DeputyProps props): base(props)
        {
        }

        /// <summary>Say hello!</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Returns another random number.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isOverride: true)]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }
    }
}
