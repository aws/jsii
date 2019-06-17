using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: stable
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIStableInterface), fullyQualifiedName: "jsii-calc.IStableInterface")]
    public interface IIStableInterface
    {
        /// <remarks>
        /// stability: stable
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        double? MutableProperty
        {
            get;
            set;
        }
        /// <remarks>
        /// stability: stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        void Method();
    }
}
