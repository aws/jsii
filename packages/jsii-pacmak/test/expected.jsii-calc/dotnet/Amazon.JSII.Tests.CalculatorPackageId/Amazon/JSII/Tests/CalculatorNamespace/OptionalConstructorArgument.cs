using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.OptionalConstructorArgument), fullyQualifiedName: "jsii-calc.OptionalConstructorArgument", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"optional\":true,\"type\":{\"primitive\":\"date\"}}]")]
    public class OptionalConstructorArgument : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public OptionalConstructorArgument(double arg1, string arg2, System.DateTime? arg3 = null): base(new DeputyProps(new object[]{arg1, arg2, arg3}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OptionalConstructorArgument(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected OptionalConstructorArgument(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "arg1", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Arg1
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "arg2", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Arg2
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "arg3", typeJson: "{\"primitive\":\"date\"}", isOptional: true)]
        public virtual System.DateTime? Arg3
        {
            get => GetInstanceProperty<System.DateTime?>();
        }
    }
}
