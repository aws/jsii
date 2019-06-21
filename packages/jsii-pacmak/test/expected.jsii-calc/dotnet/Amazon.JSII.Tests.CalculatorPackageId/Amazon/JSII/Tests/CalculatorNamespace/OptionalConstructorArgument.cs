using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(OptionalConstructorArgument), fullyQualifiedName: "jsii-calc.OptionalConstructorArgument", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
    public class OptionalConstructorArgument : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public OptionalConstructorArgument(double arg1, string arg2, System.DateTime? arg3): base(new DeputyProps(new object[]{arg1, arg2, arg3}))
        {
        }

        protected OptionalConstructorArgument(ByRefValue reference): base(reference)
        {
        }

        protected OptionalConstructorArgument(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "arg1", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Arg1
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "arg2", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Arg2
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "arg3", typeJson: "{\"primitive\":\"date\"}", isOptional: true)]
        public virtual System.DateTime? Arg3
        {
            get => GetInstanceProperty<System.DateTime?>();
        }
    }
}
