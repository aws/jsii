using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.AmbiguousParameters), fullyQualifiedName: "jsii-calc.compliance.AmbiguousParameters", parametersJson: "[{\"name\":\"scope\",\"type\":{\"fqn\":\"jsii-calc.compliance.Bell\"}},{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.compliance.StructParameterType\"}}]")]
    public class AmbiguousParameters : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public AmbiguousParameters(Amazon.JSII.Tests.CalculatorNamespace.Compliance.Bell scope, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructParameterType props): base(new DeputyProps(new object[]{scope, props}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AmbiguousParameters(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AmbiguousParameters(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "props", typeJson: "{\"fqn\":\"jsii-calc.compliance.StructParameterType\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructParameterType Props
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructParameterType>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "scope", typeJson: "{\"fqn\":\"jsii-calc.compliance.Bell\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.Bell Scope
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Compliance.Bell>();
        }
    }
}
