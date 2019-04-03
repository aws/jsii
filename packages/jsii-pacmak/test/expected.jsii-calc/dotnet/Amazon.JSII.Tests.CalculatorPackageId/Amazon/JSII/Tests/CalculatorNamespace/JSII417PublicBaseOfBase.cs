using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(JSII417PublicBaseOfBase), "jsii-calc.JSII417PublicBaseOfBase", "[]")]
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

        [JsiiProperty("hasRoot", "{\"primitive\":\"boolean\"}")]
        public virtual bool HasRoot
        {
            get => GetInstanceProperty<bool>();
        }

        [JsiiMethod("makeInstance", "{\"fqn\":\"jsii-calc.JSII417PublicBaseOfBase\"}", "[]")]
        public static JSII417PublicBaseOfBase MakeInstance()
        {
            return InvokeStaticMethod<JSII417PublicBaseOfBase>(typeof(JSII417PublicBaseOfBase), new object[]{});
        }

        [JsiiMethod("foo", null, "[]")]
        public virtual void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}