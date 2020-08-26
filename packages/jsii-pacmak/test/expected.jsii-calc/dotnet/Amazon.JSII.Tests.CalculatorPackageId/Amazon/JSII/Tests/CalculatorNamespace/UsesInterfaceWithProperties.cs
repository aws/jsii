using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.UsesInterfaceWithProperties), fullyQualifiedName: "jsii-calc.UsesInterfaceWithProperties", parametersJson: "[{\"name\":\"obj\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}}]")]
    public class UsesInterfaceWithProperties : DeputyBase
    {
        public UsesInterfaceWithProperties(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties obj): base(new DeputyProps(new object[]{obj}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UsesInterfaceWithProperties(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UsesInterfaceWithProperties(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "justRead", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string JustRead()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        [JsiiMethod(name: "readStringAndNumber", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"ext\",\"type\":{\"fqn\":\"jsii-calc.IInterfaceWithPropertiesExtension\"}}]")]
        public virtual string ReadStringAndNumber(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithPropertiesExtension ext)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithPropertiesExtension)}, new object[]{ext});
        }

        [JsiiMethod(name: "writeAndRead", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string WriteAndRead(string @value)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string)}, new object[]{@value});
        }

        [JsiiProperty(name: "obj", typeJson: "{\"fqn\":\"jsii-calc.IInterfaceWithProperties\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties Obj
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties>();
        }
    }
}
