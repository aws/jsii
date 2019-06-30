using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IIExperimentalInterface), fullyQualifiedName: "jsii-calc.IExperimentalInterface")]
    public interface IIExperimentalInterface
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        double? MutableProperty
        {
            get;
            set;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "method")]
        void Method();
    }
}