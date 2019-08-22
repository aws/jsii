using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Stable
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStableInterface), fullyQualifiedName: "jsii-calc.IStableInterface")]
    public interface IStableInterface
    {
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        double? MutableProperty
        {
            get;
            set;
        }
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        void Method();
    }
}
