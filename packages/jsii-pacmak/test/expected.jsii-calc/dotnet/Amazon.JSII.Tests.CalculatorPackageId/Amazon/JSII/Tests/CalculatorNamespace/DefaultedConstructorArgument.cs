using Amazon.JSII.Runtime.Deputy;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(DefaultedConstructorArgument), "jsii-calc.DefaultedConstructorArgument", "[{\"name\":\"arg1\",\"value\":{\"type\":{\"primitive\":\"number\"},\"optional\":true}},{\"name\":\"arg2\",\"value\":{\"type\":{\"primitive\":\"string\"},\"optional\":true}},{\"name\":\"arg3\",\"value\":{\"type\":{\"primitive\":\"date\"},\"optional\":true}}]")]
    public class DefaultedConstructorArgument : DeputyBase
    {
        public DefaultedConstructorArgument(double? arg1, string arg2, DateTime? arg3): base(new DeputyProps(new object[]{arg1, arg2, arg3}))
        {
        }

        protected DefaultedConstructorArgument(ByRefValue reference): base(reference)
        {
        }

        protected DefaultedConstructorArgument(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("arg1", "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double Arg1
        {
            get => GetInstanceProperty<double>();
        }

        [JsiiProperty("arg2", "{\"type\":{\"primitive\":\"string\"},\"optional\":true}")]
        public virtual string Arg2
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("arg3", "{\"type\":{\"primitive\":\"date\"}}")]
        public virtual DateTime Arg3
        {
            get => GetInstanceProperty<DateTime>();
        }
    }
}