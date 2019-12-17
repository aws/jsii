using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Reproduction for https://github.com/aws/jsii/issues/1113 Where a method or property named "property" would result in impossible to load Python code.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.PropertyNamedProperty), fullyQualifiedName: "jsii-calc.PropertyNamedProperty")]
    public class PropertyNamedProperty : DeputyBase
    {
        /// <summary></summary>
        public PropertyNamedProperty(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected PropertyNamedProperty(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected PropertyNamedProperty(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Property
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "yetAnoterOne", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool YetAnoterOne
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
