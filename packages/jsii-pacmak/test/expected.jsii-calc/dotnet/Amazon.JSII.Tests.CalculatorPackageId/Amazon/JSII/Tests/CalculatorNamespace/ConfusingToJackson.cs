using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This tries to confuse Jackson by having overloaded property setters.</summary>
    /// <remarks>
    /// stability: Experimental
    /// see:
    /// https://github.com/aws/aws-cdk/issues/4080
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson), fullyQualifiedName: "jsii-calc.ConfusingToJackson")]
    public class ConfusingToJackson : DeputyBase
    {
        protected ConfusingToJackson(ByRefValue reference): base(reference)
        {
        }

        protected ConfusingToJackson(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "makeInstance", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.ConfusingToJackson\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson MakeInstance()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"fqn\":\"jsii-calc.AbstractClass\"}]}},\"kind\":\"array\"}}]}}", isOptional: true)]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }
    }
}
