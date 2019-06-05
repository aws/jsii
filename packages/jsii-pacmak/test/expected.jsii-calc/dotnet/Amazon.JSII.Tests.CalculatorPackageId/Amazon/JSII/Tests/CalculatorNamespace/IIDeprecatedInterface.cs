using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Deprecated</remarks>
    [JsiiInterface(nativeType: typeof(IIDeprecatedInterface), fullyQualifiedName: "jsii-calc.IDeprecatedInterface")]
    [System.Obsolete("useless interface")]
    public interface IIDeprecatedInterface
    {
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete("could be better")]
        double? MutableProperty
        {
            get;
            set;
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete("services no purpose")]
        void Method();
    }
}