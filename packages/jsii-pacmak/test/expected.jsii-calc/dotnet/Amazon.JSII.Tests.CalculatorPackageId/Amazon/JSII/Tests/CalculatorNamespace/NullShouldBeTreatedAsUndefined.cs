using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#282, aws-cdk#157: null should be treated as "undefined".</summary>
    [JsiiClass(nativeType: typeof(NullShouldBeTreatedAsUndefined), fullyQualifiedName: "jsii-calc.NullShouldBeTreatedAsUndefined", parametersJson: "[{\"name\":\"_param1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"optional\",\"type\":{\"primitive\":\"any\"}}]")]
    public class NullShouldBeTreatedAsUndefined : DeputyBase
    {
        public NullShouldBeTreatedAsUndefined(string _param1, object optional): base(new DeputyProps(new object[]{_param1, optional}))
        {
        }

        protected NullShouldBeTreatedAsUndefined(ByRefValue reference): base(reference)
        {
        }

        protected NullShouldBeTreatedAsUndefined(DeputyProps props): base(props)
        {
        }

        [JsiiProperty(name: "changeMeToUndefined", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string ChangeMeToUndefined
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod(name: "giveMeUndefined", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void GiveMeUndefined(object value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        [JsiiMethod(name: "giveMeUndefinedInsideAnObject", parametersJson: "[{\"name\":\"input\",\"type\":{\"fqn\":\"jsii-calc.NullShouldBeTreatedAsUndefinedData\"}}]")]
        public virtual void GiveMeUndefinedInsideAnObject(INullShouldBeTreatedAsUndefinedData input)
        {
            InvokeInstanceVoidMethod(new object[]{input});
        }

        [JsiiMethod(name: "verifyPropertyIsUndefined")]
        public virtual void VerifyPropertyIsUndefined()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}