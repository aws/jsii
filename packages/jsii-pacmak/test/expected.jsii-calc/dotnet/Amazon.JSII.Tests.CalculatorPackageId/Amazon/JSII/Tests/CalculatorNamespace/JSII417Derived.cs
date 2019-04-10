using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(JSII417Derived), "jsii-calc.JSII417Derived", "[{\"name\":\"property\",\"type\":{\"primitive\":\"string\"}}]")]
    public class JSII417Derived : JSII417PublicBaseOfBase
    {
        public JSII417Derived(string property): base(new DeputyProps(new object[]{property}))
        {
        }

        protected JSII417Derived(ByRefValue reference): base(reference)
        {
        }

        protected JSII417Derived(DeputyProps props): base(props)
        {
        }

        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        protected virtual string Property
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiMethod(name: "bar", returnsJson: null, parametersJson: "[]")]
        public virtual void Bar()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "baz", returnsJson: null, parametersJson: "[]")]
        public virtual void Baz()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}