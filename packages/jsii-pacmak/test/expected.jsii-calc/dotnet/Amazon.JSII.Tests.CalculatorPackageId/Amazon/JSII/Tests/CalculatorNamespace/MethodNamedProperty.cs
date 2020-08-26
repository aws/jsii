using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.MethodNamedProperty), fullyQualifiedName: "jsii-calc.MethodNamedProperty")]
    public class MethodNamedProperty : DeputyBase
    {
        public MethodNamedProperty(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected MethodNamedProperty(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected MethodNamedProperty(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "property", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string Property()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        [JsiiProperty(name: "elite", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double Elite
        {
            get => GetInstanceProperty<double>();
        }
    }
}
