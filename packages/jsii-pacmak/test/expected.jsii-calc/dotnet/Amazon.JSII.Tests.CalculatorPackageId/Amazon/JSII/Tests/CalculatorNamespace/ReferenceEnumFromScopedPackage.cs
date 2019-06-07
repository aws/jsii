using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>See awslabs/jsii#138.</summary>
    [JsiiClass(nativeType: typeof(ReferenceEnumFromScopedPackage), fullyQualifiedName: "jsii-calc.ReferenceEnumFromScopedPackage")]
    public class ReferenceEnumFromScopedPackage : DeputyBase
    {
        public ReferenceEnumFromScopedPackage(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ReferenceEnumFromScopedPackage(ByRefValue reference): base(reference)
        {
        }

        protected ReferenceEnumFromScopedPackage(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "loadFoo", returnsJson: "{\"optional\":true,\"type\":{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule LoadFoo()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule>(new object[]{});
        }

        [JsiiMethod(name: "saveFoo", parametersJson: "[{\"name\":\"value\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"}}]")]
        public virtual void SaveFoo(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule @value)
        {
            InvokeInstanceVoidMethod(new object[]{@value});
        }

        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"}", isOptional: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule Foo
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.EnumFromScopedModule>();
            set => SetInstanceProperty(value);
        }
    }
}
