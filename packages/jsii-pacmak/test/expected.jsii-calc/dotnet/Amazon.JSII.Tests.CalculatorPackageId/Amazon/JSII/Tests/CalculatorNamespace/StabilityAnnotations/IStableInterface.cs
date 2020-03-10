using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations
{
    /// <remarks>
    /// <strong>Stability</strong>: Stable
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStableInterface), fullyQualifiedName: "jsii-calc.stability_annotations.IStableInterface")]
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
