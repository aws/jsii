using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#282, aws-cdk#157: null should be treated as "undefined".</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.NullShouldBeTreatedAsUndefined), fullyQualifiedName: "jsii-calc.NullShouldBeTreatedAsUndefined", parametersJson: "[{\"name\":\"_param1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"optional\",\"optional\":true,\"type\":{\"primitive\":\"any\"}}]")]
    public class NullShouldBeTreatedAsUndefined : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public NullShouldBeTreatedAsUndefined(string param1, object optional = null): base(new DeputyProps(new object[]{param1, optional}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected NullShouldBeTreatedAsUndefined(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected NullShouldBeTreatedAsUndefined(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "giveMeUndefined", parametersJson: "[{\"name\":\"value\",\"optional\":true,\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void GiveMeUndefined(object @value = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(object)}, new object[]{@value});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "giveMeUndefinedInsideAnObject", parametersJson: "[{\"name\":\"input\",\"type\":{\"fqn\":\"jsii-calc.NullShouldBeTreatedAsUndefinedData\"}}]")]
        public virtual void GiveMeUndefinedInsideAnObject(Amazon.JSII.Tests.CalculatorNamespace.INullShouldBeTreatedAsUndefinedData input)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.INullShouldBeTreatedAsUndefinedData)}, new object[]{input});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "verifyPropertyIsUndefined")]
        public virtual void VerifyPropertyIsUndefined()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "changeMeToUndefined", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string ChangeMeToUndefined
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
