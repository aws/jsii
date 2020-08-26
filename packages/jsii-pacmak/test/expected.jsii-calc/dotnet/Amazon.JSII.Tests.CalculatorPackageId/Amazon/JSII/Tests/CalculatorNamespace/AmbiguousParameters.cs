using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AmbiguousParameters), fullyQualifiedName: "jsii-calc.AmbiguousParameters", parametersJson: "[{\"name\":\"scope\",\"type\":{\"fqn\":\"jsii-calc.Bell\"}},{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.StructParameterType\"}}]")]
    public class AmbiguousParameters : DeputyBase
    {
        public AmbiguousParameters(Amazon.JSII.Tests.CalculatorNamespace.Bell scope, Amazon.JSII.Tests.CalculatorNamespace.IStructParameterType props): base(new DeputyProps(new object[]{scope, props}))
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

        [JsiiProperty(name: "props", typeJson: "{\"fqn\":\"jsii-calc.StructParameterType\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IStructParameterType Props
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IStructParameterType>();
        }

        [JsiiProperty(name: "scope", typeJson: "{\"fqn\":\"jsii-calc.Bell\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Bell Scope
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Bell>();
        }
    }
}
