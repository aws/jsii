using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AmbiguousParameters), fullyQualifiedName: "jsii-calc.AmbiguousParameters", parametersJson: "[{\"name\":\"scope\",\"type\":{\"fqn\":\"jsii-calc.Bell\"}},{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.StructParameterType\"}}]")]
    public class AmbiguousParameters : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public AmbiguousParameters(Amazon.JSII.Tests.CalculatorNamespace.Bell scope, Amazon.JSII.Tests.CalculatorNamespace.IStructParameterType props): base(new DeputyProps(new object[]{scope, props}))
        {
        }

        protected AmbiguousParameters(ByRefValue reference): base(reference)
        {
        }

        protected AmbiguousParameters(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "props", typeJson: "{\"fqn\":\"jsii-calc.StructParameterType\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IStructParameterType Props
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IStructParameterType>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "scope", typeJson: "{\"fqn\":\"jsii-calc.Bell\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Bell Scope
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Bell>();
        }
    }
}
