using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>See awslabs/jsii#138.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ReferenceEnumFromScopedPackage), fullyQualifiedName: "jsii-calc.ReferenceEnumFromScopedPackage")]
    public class ReferenceEnumFromScopedPackage : DeputyBase
    {
        /// <summary></summary>
        public ReferenceEnumFromScopedPackage(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected ReferenceEnumFromScopedPackage(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected ReferenceEnumFromScopedPackage(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "loadFoo", returnsJson: "{\"optional\":true,\"type\":{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule LoadFoo()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule>(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <param name="value"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "saveFoo", parametersJson: "[{\"name\":\"value\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"}}]")]
        public virtual void SaveFoo(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule @value)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule)}, new object[]{@value});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"}", isOptional: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule? Foo
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule?>();
            set => SetInstanceProperty(value);
        }
    }
}
