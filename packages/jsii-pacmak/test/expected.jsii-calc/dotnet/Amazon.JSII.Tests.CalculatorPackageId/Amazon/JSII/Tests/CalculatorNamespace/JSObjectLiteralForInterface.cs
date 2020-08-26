using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.JSObjectLiteralForInterface), fullyQualifiedName: "jsii-calc.JSObjectLiteralForInterface")]
    public class JSObjectLiteralForInterface : DeputyBase
    {
        public JSObjectLiteralForInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JSObjectLiteralForInterface(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JSObjectLiteralForInterface(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "giveMeFriendly", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IFriendly GiveMeFriendly()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IFriendly>(new System.Type[]{}, new object[]{});
        }

        [JsiiMethod(name: "giveMeFriendlyGenerator", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IFriendlyRandomGenerator\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IFriendlyRandomGenerator GiveMeFriendlyGenerator()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IFriendlyRandomGenerator>(new System.Type[]{}, new object[]{});
        }
    }
}
