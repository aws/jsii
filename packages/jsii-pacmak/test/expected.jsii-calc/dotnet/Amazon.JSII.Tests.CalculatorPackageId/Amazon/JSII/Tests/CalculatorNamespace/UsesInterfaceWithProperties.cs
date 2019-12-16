using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.UsesInterfaceWithProperties), fullyQualifiedName: "jsii-calc.UsesInterfaceWithProperties", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}}]")]
    public class UsesInterfaceWithProperties : DeputyBase
    {
        /// <summary></summary>
        /// <param name="obj"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public UsesInterfaceWithProperties(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties obj): base(new DeputyProps(new object[]{obj}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected UsesInterfaceWithProperties(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected UsesInterfaceWithProperties(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "justRead", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string JustRead()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <param name="ext"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "readStringAndNumber", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"ext\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithPropertiesExtension\"}}]")]
        public virtual string ReadStringAndNumber(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithPropertiesExtension ext)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithPropertiesExtension)}, new object[]{ext});
        }

        /// <summary></summary>
        /// <param name="value"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "writeAndRead", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string WriteAndRead(string @value)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string)}, new object[]{@value});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "obj", typeJson: "{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties Obj
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties>();
        }
    }
}
