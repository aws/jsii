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
        /// stability: Stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        void Method();
    }
}
