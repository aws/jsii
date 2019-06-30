using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>The general contract for a concrete number.</summary>
    /// <remarks>stability: Deprecated</remarks>
    [JsiiInterface(nativeType: typeof(IIDoublable), fullyQualifiedName: "@scope/jsii-calc-lib.IDoublable")]
    [System.Obsolete()]
    public interface IIDoublable
    {
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "doubleValue", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        double DoubleValue
        {
            get;
        }
    }
}