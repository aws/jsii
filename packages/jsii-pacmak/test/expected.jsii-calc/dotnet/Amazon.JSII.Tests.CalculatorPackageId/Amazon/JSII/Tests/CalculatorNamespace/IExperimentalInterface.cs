using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IExperimentalInterface), fullyQualifiedName: "jsii-calc.IExperimentalInterface")]
    public interface IExperimentalInterface
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        double? MutableProperty
        {
            #if NETCOREAPP3_0
            get
            {
                return null;
            }
            set
            {
                throw new System.NotSupportedException("'set' for 'MutableProperty' is not implemented");
            }
            #else
            get;
            set;
            #endif
        }
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "method")]
        void Method();
    }
}
