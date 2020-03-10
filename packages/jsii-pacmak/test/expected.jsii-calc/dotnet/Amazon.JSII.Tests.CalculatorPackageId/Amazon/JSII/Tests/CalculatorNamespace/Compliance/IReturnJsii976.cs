using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Returns a subclass of a known class which implements an interface.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IReturnJsii976), fullyQualifiedName: "jsii-calc.compliance.IReturnJsii976")]
    public interface IReturnJsii976
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        double Foo
        {
            get;
        }
    }
}
