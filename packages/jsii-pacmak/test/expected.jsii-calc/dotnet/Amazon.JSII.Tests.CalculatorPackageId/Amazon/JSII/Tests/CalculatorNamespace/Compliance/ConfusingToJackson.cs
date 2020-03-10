using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>This tries to confuse Jackson by having overloaded property setters.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>See</strong>: https://github.com/aws/aws-cdk/issues/4080
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConfusingToJackson), fullyQualifiedName: "jsii-calc.compliance.ConfusingToJackson")]
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

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "makeInstance", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.ConfusingToJackson\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConfusingToJackson MakeInstance()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConfusingToJackson>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConfusingToJackson), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "makeStructInstance", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.ConfusingToJacksonStruct\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.IConfusingToJacksonStruct MakeStructInstance()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IConfusingToJacksonStruct>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ConfusingToJackson), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.compliance.AbstractClass\"},{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"}]}},\"kind\":\"array\"}}]}}", isOptional: true)]
        public virtual object? UnionProperty
        {
            get => GetInstanceProperty<object?>();
            set => SetInstanceProperty(value);
        }
    }
}
