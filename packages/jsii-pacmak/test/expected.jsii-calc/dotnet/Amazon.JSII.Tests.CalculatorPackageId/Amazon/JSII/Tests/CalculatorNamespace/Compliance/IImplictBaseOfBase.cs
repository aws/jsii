using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IImplictBaseOfBase), fullyQualifiedName: "jsii-calc.compliance.ImplictBaseOfBase")]
    public interface IImplictBaseOfBase : Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.IBaseProps
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "goo", typeJson: "{\"primitive\":\"date\"}")]
        System.DateTime Goo
        {
            get;
        }
    }
}
