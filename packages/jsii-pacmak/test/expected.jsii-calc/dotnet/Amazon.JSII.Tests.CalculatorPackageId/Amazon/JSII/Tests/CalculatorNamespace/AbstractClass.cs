using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AbstractClass), fullyQualifiedName: "jsii-calc.AbstractClass")]
    public abstract class AbstractClass : Amazon.JSII.Tests.CalculatorNamespace.AbstractClassBase, Amazon.JSII.Tests.CalculatorNamespace.IInterfaceImplementedByAbstractClass
    {
        /// <summary></summary>
        protected AbstractClass(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected AbstractClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected AbstractClass(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="name"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "abstractMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public abstract string AbstractMethod(string name);


        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "nonAbstractMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NonAbstractMethod()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }
    }
}
