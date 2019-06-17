using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIExperimentalInterface), fullyQualifiedName: "jsii-calc.IExperimentalInterface")]
    public interface IIExperimentalInterface
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        double? MutableProperty
        {
            get;
            set;
        }
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "method")]
        void Method();
    }
}
