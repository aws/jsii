using Amazon.JSII.Runtime.Deputy;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(DefaultedConstructorArgument), fullyQualifiedName: "jsii-calc.DefaultedConstructorArgument", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"},\"optional\":true},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"},\"optional\":true},{\"name\":\"arg3\",\"type\":{\"primitive\":\"date\"},\"optional\":true}]")]
    public class DefaultedConstructorArgument : DeputyBase
    {
        /// <remarks>stability: Experimental</remarks>
        public DefaultedConstructorArgument(double? arg1, string arg2, DateTime? arg3): base(new DeputyProps(new object[]{arg1, arg2, arg3}))
        {
        }

        protected DefaultedConstructorArgument(ByRefValue reference): base(reference)
        {
        }

        protected DefaultedConstructorArgument(DeputyProps props): base(props)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "arg1", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Arg1
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "arg3", typeJson: "{\"primitive\":\"date\"}")]
        public virtual DateTime Arg3
        {
            get => GetInstanceProperty<DateTime>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "arg2", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string Arg2
        {
            get => GetInstanceProperty<string>();
        }
    }
}