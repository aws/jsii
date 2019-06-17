using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#282, aws-cdk#157: null should be treated as "undefined".</summary>
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(NullShouldBeTreatedAsUndefined), fullyQualifiedName: "jsii-calc.NullShouldBeTreatedAsUndefined", parametersJson: "[{\"name\":\"_param1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"optional\",\"optional\":true,\"type\":{\"primitive\":\"any\"}}]")]
    public class NullShouldBeTreatedAsUndefined : DeputyBase
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        public NullShouldBeTreatedAsUndefined(string param1, object optional): base(new DeputyProps(new object[]{param1, optional}))
        {
        }

        protected NullShouldBeTreatedAsUndefined(ByRefValue reference): base(reference)
        {
        }

        protected NullShouldBeTreatedAsUndefined(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "giveMeUndefined", parametersJson: "[{\"name\":\"value\",\"optional\":true,\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void GiveMeUndefined(object @value)
        {
            InvokeInstanceVoidMethod(new object[]{@value});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "giveMeUndefinedInsideAnObject", parametersJson: "[{\"name\":\"input\",\"type\":{\"fqn\":\"jsii-calc.NullShouldBeTreatedAsUndefinedData\"}}]")]
        public virtual void GiveMeUndefinedInsideAnObject(Amazon.JSII.Tests.CalculatorNamespace.INullShouldBeTreatedAsUndefinedData input)
        {
            InvokeInstanceVoidMethod(new object[]{input});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "verifyPropertyIsUndefined")]
        public virtual void VerifyPropertyIsUndefined()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "changeMeToUndefined", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string ChangeMeToUndefined
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
