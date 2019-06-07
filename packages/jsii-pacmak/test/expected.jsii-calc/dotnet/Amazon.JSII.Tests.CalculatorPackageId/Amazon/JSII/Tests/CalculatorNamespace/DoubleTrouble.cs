using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(DoubleTrouble), fullyQualifiedName: "jsii-calc.DoubleTrouble")]
    public class DoubleTrouble : DeputyBase, IIFriendlyRandomGenerator
    {
        public DoubleTrouble(): base(new DeputyProps(new object[]{}))
        {
        }

        protected DoubleTrouble(ByRefValue reference): base(reference)
        {
        }

        protected DoubleTrouble(DeputyProps props): base(props)
        {
        }

        /// <summary>Say hello!</summary>
        [JsiiMethod(name: "hello", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", isOverride: true)]
        public virtual string Hello()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Returns another random number.</summary>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isOverride: true)]
        public virtual double Next()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}
