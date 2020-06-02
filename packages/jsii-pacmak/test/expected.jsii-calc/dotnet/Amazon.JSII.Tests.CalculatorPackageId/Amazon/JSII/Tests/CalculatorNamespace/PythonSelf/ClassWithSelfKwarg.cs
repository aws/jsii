using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.PythonSelf
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.ClassWithSelfKwarg), fullyQualifiedName: "jsii-calc.PythonSelf.ClassWithSelfKwarg", parametersJson: "[{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.PythonSelf.StructWithSelf\"}}]")]
    public class ClassWithSelfKwarg : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public ClassWithSelfKwarg(Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.IStructWithSelf props): base(new DeputyProps(new object[]{props}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithSelfKwarg(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithSelfKwarg(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "props", typeJson: "{\"fqn\":\"jsii-calc.PythonSelf.StructWithSelf\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.IStructWithSelf Props
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.IStructWithSelf>();
        }
    }
}
