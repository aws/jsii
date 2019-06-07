using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(JSObjectLiteralForInterface), fullyQualifiedName: "jsii-calc.JSObjectLiteralForInterface")]
    public class JSObjectLiteralForInterface : DeputyBase
    {
        public JSObjectLiteralForInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected JSObjectLiteralForInterface(ByRefValue reference): base(reference)
        {
        }

        protected JSObjectLiteralForInterface(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "giveMeFriendly", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IIFriendly GiveMeFriendly()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IIFriendly>(new object[]{});
        }

        [JsiiMethod(name: "giveMeFriendlyGenerator", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IFriendlyRandomGenerator\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IIFriendlyRandomGenerator GiveMeFriendlyGenerator()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IIFriendlyRandomGenerator>(new object[]{});
        }
    }
}
