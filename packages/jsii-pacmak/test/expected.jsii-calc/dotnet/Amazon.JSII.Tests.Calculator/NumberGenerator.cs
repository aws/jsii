using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>
    /// This allows us to test that a reference can be stored for objects that
    /// implement interfaces.
    /// </summary>
    [JsiiClass(typeof(NumberGenerator), "jsii-calc.NumberGenerator", "[{\"name\":\"generator\",\"type\":{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}}]")]
    public class NumberGenerator : DeputyBase
    {
        public NumberGenerator(IIRandomNumberGenerator generator): base(new DeputyProps(new object[]{generator}))
        {
        }

        protected NumberGenerator(ByRefValue reference): base(reference)
        {
        }

        protected NumberGenerator(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("generator", "{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}")]
        public virtual IIRandomNumberGenerator Generator
        {
            get => GetInstanceProperty<IIRandomNumberGenerator>();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod("nextTimes100", "{\"primitive\":\"number\"}", "[]")]
        public virtual double NextTimes100()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod("isSameGenerator", "{\"primitive\":\"boolean\"}", "[{\"name\":\"gen\",\"type\":{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}}]")]
        public virtual bool IsSameGenerator(IIRandomNumberGenerator gen)
        {
            return InvokeInstanceMethod<bool>(new object[]{gen});
        }
    }
}