using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DefaultedConstructorArgument), fullyQualifiedName: "jsii-calc.DefaultedConstructorArgument", parametersJson: "[{\"name\":\"arg1\",\"optional\":true,\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"optional\":true,\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
    public class DefaultedConstructorArgument : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public DefaultedConstructorArgument(double? arg1 = null, string arg2 = null, System.DateTime? arg3 = null): base(new DeputyProps(new object[]{arg1, arg2, arg3}))
        {
        }

        protected DefaultedConstructorArgument(ByRefValue reference): base(reference)
        {
        }

        protected DefaultedConstructorArgument(DeputyProps props): base(props)
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
        [JsiiProperty(name: "arg3", typeJson: "{\"primitive\":\"date\"}")]
        public virtual System.DateTime Arg3
        {
            get => GetInstanceProperty<System.DateTime>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "arg2", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public virtual string Arg2
        {
            get => GetInstanceProperty<string>();
        }
    }
}
