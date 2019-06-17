using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// deprecated: useless interface
    /// stability: deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIDeprecatedInterface), fullyQualifiedName: "jsii-calc.IDeprecatedInterface")]
    [System.Obsolete()]
    public interface IIDeprecatedInterface
    {
        /// <remarks>
        /// deprecated: could be better
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete()]
        double? MutableProperty
        {
            get;
            set;
        }
        /// <remarks>
        /// deprecated: services no purpose
        /// stability: deprecated
        /// </remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete()]
        void Method();
    }
}
