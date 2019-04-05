using Amazon.JSII.Runtime.Deputy;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(OptionalConstructorArgument), "jsii-calc.OptionalConstructorArgument", "[{\"name\":\"arg1\",\"value\":{\"type\":{\"primitive\":\"number\"}}},{\"name\":\"arg2\",\"value\":{\"type\":{\"primitive\":\"string\"}}},{\"name\":\"arg3\",\"value\":{\"type\":{\"primitive\":\"date\"},\"optional\":true}}]")]
    public class OptionalConstructorArgument : DeputyBase
    {
        public OptionalConstructorArgument(double arg1, string arg2, DateTime? arg3): base(new DeputyProps(new object[]{arg1, arg2, arg3}))
        {
        }

        protected OptionalConstructorArgument(ByRefValue reference): base(reference)
        {
        }

        protected OptionalConstructorArgument(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("arg1", "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double Arg1
        {
            get => GetInstanceProperty<double>();
        }

        [JsiiProperty("arg2", "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string Arg2
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("arg3", "{\"type\":{\"primitive\":\"date\"},\"optional\":true}")]
        public virtual DateTime? Arg3
        {
            get => GetInstanceProperty<DateTime? >();
        }
    }
}