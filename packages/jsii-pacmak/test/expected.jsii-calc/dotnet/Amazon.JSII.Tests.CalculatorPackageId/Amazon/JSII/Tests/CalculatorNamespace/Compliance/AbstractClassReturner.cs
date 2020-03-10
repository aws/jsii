using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClassReturner), fullyQualifiedName: "jsii-calc.compliance.AbstractClassReturner")]
    public class AbstractClassReturner : DeputyBase
    {
        public AbstractClassReturner(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AbstractClassReturner(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AbstractClassReturner(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "giveMeAbstract", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.AbstractClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClass GiveMeAbstract()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClass>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "giveMeInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.IInterfaceImplementedByAbstractClass\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.IInterfaceImplementedByAbstractClass GiveMeInterface()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IInterfaceImplementedByAbstractClass>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "returnAbstractFromProperty", typeJson: "{\"fqn\":\"jsii-calc.compliance.AbstractClassBase\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClassBase ReturnAbstractFromProperty
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.Compliance.AbstractClassBase>();
        }
    }
}
