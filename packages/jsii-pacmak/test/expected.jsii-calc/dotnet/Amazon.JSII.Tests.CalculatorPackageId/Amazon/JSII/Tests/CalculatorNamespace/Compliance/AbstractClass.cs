using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClass), fullyQualifiedName: "jsii-calc.compliance.AbstractClass")]
    public abstract class AbstractClass : Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClassBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IInterfaceImplementedByAbstractClass
    {
        protected AbstractClass(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AbstractClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AbstractClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "abstractMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public abstract string AbstractMethod(string name);


        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "nonAbstractMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double NonAbstractMethod()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }
    }
}
