using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Stable
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStableInterface), fullyQualifiedName: "jsii-calc.IStableInterface")]
    public interface IStableInterface
    {
        /// <remarks>
        /// <strong>Stability</strong>: Stable
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        double? MutableProperty
        {
            get
            {
                return null;
            }
            set
            {
                throw new System.NotSupportedException("'set' for 'MutableProperty' is not implemented");
            }
        }
        /// <remarks>
        /// <strong>Stability</strong>: Stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        void Method();
    }
}
