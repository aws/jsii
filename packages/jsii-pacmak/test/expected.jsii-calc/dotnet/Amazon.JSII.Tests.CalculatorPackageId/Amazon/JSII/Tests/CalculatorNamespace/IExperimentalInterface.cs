using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IExperimentalInterface), fullyQualifiedName: "jsii-calc.IExperimentalInterface")]
    public interface IExperimentalInterface
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
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
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "method")]
        void Method();
    }
}
