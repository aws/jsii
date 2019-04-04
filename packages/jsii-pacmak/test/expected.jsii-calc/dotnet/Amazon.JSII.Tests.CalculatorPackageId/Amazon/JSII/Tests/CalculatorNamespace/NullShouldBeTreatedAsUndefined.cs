using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#282, aws-cdk#157: null should be treated as "undefined".</summary>
    [JsiiClass(typeof(NullShouldBeTreatedAsUndefined), "jsii-calc.NullShouldBeTreatedAsUndefined", "[{\"name\":\"_param1\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"optional\",\"type\":{\"primitive\":\"any\",\"nullable\":true}}]")]
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

        [JsiiProperty("changeMeToUndefined", "{\"primitive\":\"string\",\"nullable\":true}")]
        public virtual string ChangeMeToUndefined
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod("giveMeUndefined", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"any\",\"nullable\":true}}]")]
        public virtual void GiveMeUndefined(object value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        [JsiiMethod("giveMeUndefinedInsideAnObject", null, "[{\"name\":\"input\",\"type\":{\"fqn\":\"jsii-calc.NullShouldBeTreatedAsUndefinedData\"}}]")]
        public virtual void GiveMeUndefinedInsideAnObject(INullShouldBeTreatedAsUndefinedData input)
        {
            InvokeInstanceVoidMethod(new object[]{input});
        }

        [JsiiMethod("verifyPropertyIsUndefined", null, "[]")]
        public virtual void VerifyPropertyIsUndefined()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}