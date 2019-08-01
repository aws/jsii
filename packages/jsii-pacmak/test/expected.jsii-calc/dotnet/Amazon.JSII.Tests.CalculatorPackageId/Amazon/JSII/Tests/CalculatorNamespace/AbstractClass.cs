using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AbstractClass), fullyQualifiedName: "jsii-calc.AbstractClass")]
    public abstract class AbstractClass : Amazon.JSII.Tests.CalculatorNamespace.AbstractClassBase, Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceImplementedByAbstractClass
    {
        protected AbstractClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AbstractClass(ByRefValue reference): base(reference)
        {
        }

        protected AbstractClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "abstractMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public abstract string AbstractMethod(string name);


        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "nonAbstractMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NonAbstractMethod()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

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
