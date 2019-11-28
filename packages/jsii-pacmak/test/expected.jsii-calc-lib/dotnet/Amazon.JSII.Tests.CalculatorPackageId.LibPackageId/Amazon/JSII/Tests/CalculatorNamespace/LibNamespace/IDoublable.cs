using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>The general contract for a concrete number.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDoublable), fullyQualifiedName: "@scope/jsii-calc-lib.IDoublable")]
    [System.Obsolete()]
    public interface IDoublable
    {
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        double DoubleValue
        {
            get;
        }
    }
}
