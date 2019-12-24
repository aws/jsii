using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDeprecatedInterface), fullyQualifiedName: "jsii-calc.IDeprecatedInterface")]
    [System.Obsolete("useless interface")]
    public interface IDeprecatedInterface
    {
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete("could be better")]
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
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete("services no purpose")]
        void Method();
    }
}
