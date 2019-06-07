using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(JSII417PublicBaseOfBase), fullyQualifiedName: "jsii-calc.JSII417PublicBaseOfBase")]
    public class JSII417PublicBaseOfBase : DeputyBase
    {
        public JSII417PublicBaseOfBase(): base(new DeputyProps(new object[]{}))
        {
        }

        protected JSII417PublicBaseOfBase(ByRefValue reference): base(reference)
        {
        }

        protected JSII417PublicBaseOfBase(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "makeInstance", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.JSII417PublicBaseOfBase\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.JSII417PublicBaseOfBase MakeInstance()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.JSII417PublicBaseOfBase>(typeof(JSII417PublicBaseOfBase), new object[]{});
        }

        [JsiiMethod(name: "foo")]
        public virtual void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiProperty(name: "hasRoot", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool HasRoot
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
