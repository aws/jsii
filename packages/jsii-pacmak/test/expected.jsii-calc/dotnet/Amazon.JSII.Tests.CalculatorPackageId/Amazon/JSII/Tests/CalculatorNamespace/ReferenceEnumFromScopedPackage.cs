using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>See awslabs/jsii#138.</summary>
    [JsiiClass(typeof(ReferenceEnumFromScopedPackage), "jsii-calc.ReferenceEnumFromScopedPackage", "[]")]
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

        [JsiiProperty("foo", "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"},\"optional\":true}")]
        public virtual EnumFromScopedModule? Foo
        {
            get => GetInstanceProperty<EnumFromScopedModule? >();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod("loadFoo", "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"},\"optional\":true}", "[]")]
        public virtual EnumFromScopedModule? LoadFoo()
        {
            return InvokeInstanceMethod<EnumFromScopedModule? >(new object[]{});
        }

        [JsiiMethod("saveFoo", null, "[{\"name\":\"value\",\"value\":{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.EnumFromScopedModule\"}}}]")]
        public virtual void SaveFoo(EnumFromScopedModule value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }
    }
}