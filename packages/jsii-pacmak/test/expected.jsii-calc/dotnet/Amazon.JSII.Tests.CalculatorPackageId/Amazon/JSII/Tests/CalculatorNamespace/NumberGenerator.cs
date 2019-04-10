using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This allows us to test that a reference can be stored for objects that implement interfaces.</summary>
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

        [JsiiProperty(name: "generator", typeJson: "{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}")]
        public virtual IIRandomNumberGenerator Generator
        {
            get => GetInstanceProperty<IIRandomNumberGenerator>();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod(name: "isSameGenerator", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"gen\",\"type\":{\"fqn\":\"jsii-calc.IRandomNumberGenerator\"}}]")]
        public virtual bool IsSameGenerator(IIRandomNumberGenerator gen)
        {
            return InvokeInstanceMethod<bool>(new object[]{gen});
        }

        [JsiiMethod(name: "nextTimes100", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[]")]
        public virtual double NextTimes100()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}