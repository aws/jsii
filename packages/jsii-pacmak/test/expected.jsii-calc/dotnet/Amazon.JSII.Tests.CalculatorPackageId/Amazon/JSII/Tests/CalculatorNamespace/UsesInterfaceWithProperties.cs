using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(UsesInterfaceWithProperties), "jsii-calc.UsesInterfaceWithProperties", "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}}]")]
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

        [JsiiProperty(name: "obj", typeJson: "{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}")]
        public virtual IIInterfaceWithProperties Obj
        {
            get => GetInstanceProperty<IIInterfaceWithProperties>();
        }

        [JsiiMethod(name: "justRead", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[]")]
        public virtual string JustRead()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod(name: "readStringAndNumber", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"ext\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithPropertiesExtension\"}}]")]
        public virtual string ReadStringAndNumber(IIInterfaceWithPropertiesExtension ext)
        {
            return InvokeInstanceMethod<string>(new object[]{ext});
        }

        [JsiiMethod(name: "writeAndRead", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string WriteAndRead(string value)
        {
            return InvokeInstanceMethod<string>(new object[]{value});
        }
    }
}