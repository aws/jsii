using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(StripInternal), fullyQualifiedName: "jsii-calc.StripInternal")]
    public class StripInternal : DeputyBase
    {
        public StripInternal(): base(new DeputyProps(new object[]{}))
        {
        }

        protected StripInternal(ByRefValue reference): base(reference)
        {
        }

        protected StripInternal(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "youSeeMe", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string YouSeeMe
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
