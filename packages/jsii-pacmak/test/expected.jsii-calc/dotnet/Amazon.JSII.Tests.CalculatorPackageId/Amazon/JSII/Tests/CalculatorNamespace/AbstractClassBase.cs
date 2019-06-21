using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(AbstractClassBase), fullyQualifiedName: "jsii-calc.AbstractClassBase")]
    public abstract class AbstractClassBase : DeputyBase
    {
        protected AbstractClassBase(): base(new DeputyProps(new object[]{}))
        {
        }

        protected AbstractClassBase(ByRefValue reference): base(reference)
        {
        }

        protected AbstractClassBase(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "abstractProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string AbstractProperty
        {
            get => GetInstanceProperty<string>();
        }
    }
}
