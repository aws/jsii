using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(UsesInterfaceWithProperties), "jsii-calc.UsesInterfaceWithProperties", "[{\"name\":\"obj\",\"value\":{\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}}}]")]
    public class UsesInterfaceWithProperties : DeputyBase
    {
        public UsesInterfaceWithProperties(IIInterfaceWithProperties obj): base(new DeputyProps(new object[]{obj}))
        {
        }

        protected UsesInterfaceWithProperties(ByRefValue reference): base(reference)
        {
        }

        protected UsesInterfaceWithProperties(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("obj", "{\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}}")]
        public virtual IIInterfaceWithProperties Obj
        {
            get => GetInstanceProperty<IIInterfaceWithProperties>();
        }

        [JsiiMethod("justRead", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        public virtual string JustRead()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod("readStringAndNumber", "{\"type\":{\"primitive\":\"string\"}}", "[{\"name\":\"ext\",\"value\":{\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithPropertiesExtension\"}}}]")]
        public virtual string ReadStringAndNumber(IIInterfaceWithPropertiesExtension ext)
        {
            return InvokeInstanceMethod<string>(new object[]{ext});
        }

        [JsiiMethod("writeAndRead", "{\"type\":{\"primitive\":\"string\"}}", "[{\"name\":\"value\",\"value\":{\"type\":{\"primitive\":\"string\"}}}]")]
        public virtual string WriteAndRead(string value)
        {
            return InvokeInstanceMethod<string>(new object[]{value});
        }
    }
}