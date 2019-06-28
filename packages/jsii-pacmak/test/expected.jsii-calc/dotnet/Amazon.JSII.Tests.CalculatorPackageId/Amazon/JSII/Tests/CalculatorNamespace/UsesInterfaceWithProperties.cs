using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(UsesInterfaceWithProperties), fullyQualifiedName: "jsii-calc.UsesInterfaceWithProperties", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}}]")]
    public class UsesInterfaceWithProperties : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public UsesInterfaceWithProperties(Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceWithProperties obj): base(new DeputyProps(new object[]{obj}))
        {
        }

        protected UsesInterfaceWithProperties(ByRefValue reference): base(reference)
        {
        }

        protected UsesInterfaceWithProperties(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "justRead", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string JustRead()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "readStringAndNumber", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"ext\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithPropertiesExtension\"}}]")]
        public virtual string ReadStringAndNumber(Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceWithPropertiesExtension ext)
        {
            return InvokeInstanceMethod<string>(new object[]{ext});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "writeAndRead", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string WriteAndRead(string @value)
        {
            return InvokeInstanceMethod<string>(new object[]{@value});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "obj", typeJson: "{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceWithProperties Obj
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceWithProperties>();
        }
    }
}
