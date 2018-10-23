using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(UsesInterfaceWithProperties), "jsii-calc.UsesInterfaceWithProperties", "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.InterfaceWithProperties\"}}]")]
    public class UsesInterfaceWithProperties : DeputyBase
    {
        public UsesInterfaceWithProperties(IInterfaceWithProperties obj): base(new DeputyProps(new object[]{obj}))
        {
        }

        protected UsesInterfaceWithProperties(ByRefValue reference): base(reference)
        {
        }

        protected UsesInterfaceWithProperties(DeputyProps props): base(props)
        {
        }

        [JsiiProperty("obj", "{\"fqn\":\"jsii-calc.InterfaceWithProperties\"}")]
        public virtual IInterfaceWithProperties Obj
        {
            get => GetInstanceProperty<IInterfaceWithProperties>();
        }

        [JsiiMethod("justRead", "{\"primitive\":\"string\"}", "[]")]
        public virtual string JustRead()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod("readStringAndNumber", "{\"primitive\":\"string\"}", "[{\"name\":\"ext\",\"type\":{\"fqn\":\"jsii-calc.InterfaceWithPropertiesExtension\"}}]")]
        public virtual string ReadStringAndNumber(IInterfaceWithPropertiesExtension ext)
        {
            return InvokeInstanceMethod<string>(new object[]{ext});
        }

        [JsiiMethod("writeAndRead", "{\"primitive\":\"string\"}", "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string WriteAndRead(string value)
        {
            return InvokeInstanceMethod<string>(new object[]{value});
        }
    }
}