using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble), fullyQualifiedName: "jsii-calc.DoubleTrouble")]
    public class DoubleTrouble : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IFriendlyRandomGenerator
    {
        /// <summary></summary>
        public DoubleTrouble(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected DoubleTrouble(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected DoubleTrouble(DeputyProps props): base(props)
        {
        }

        /// <summary>Say hello!</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Returns another random number.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isOverride: true)]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }
    }
}
