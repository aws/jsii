using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(AbstractClass), fullyQualifiedName: "jsii-calc.AbstractClass")]
    public abstract class AbstractClass : AbstractClassBase, IIInterfaceImplementedByAbstractClass
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
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "abstractMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public abstract string AbstractMethod(string name);


        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "nonAbstractMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NonAbstractMethod()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }
    }
}
