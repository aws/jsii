using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This tries to confuse Jackson by having overloaded property setters.</summary>
    /// <remarks>
    /// <strong>See</strong>: https://github.com/aws/aws-cdk/issues/4080
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson), fullyQualifiedName: "jsii-calc.ConfusingToJackson")]
    public class ConfusingToJackson : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConfusingToJackson(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConfusingToJackson(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "makeInstance", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.ConfusingToJackson\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson MakeInstance()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson), new System.Type[]{}, new object[]{});
        }

        [JsiiMethod(name: "makeStructInstance", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.ConfusingToJacksonStruct\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IConfusingToJacksonStruct MakeStructInstance()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IConfusingToJacksonStruct>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConfusingToJackson), new System.Type[]{}, new object[]{});
        }

        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"fqn\":\"jsii-calc.AbstractClass\"}]}},\"kind\":\"array\"}}]}}", isOptional: true)]
        public virtual object? UnionProperty
        {
            get => GetInstanceProperty<object?>();
            set => SetInstanceProperty(value);
        }
    }
}
