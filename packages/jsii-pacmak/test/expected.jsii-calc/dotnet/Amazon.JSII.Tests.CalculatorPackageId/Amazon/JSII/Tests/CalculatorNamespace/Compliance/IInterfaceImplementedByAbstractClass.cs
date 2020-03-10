using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>awslabs/jsii#220 Abstract return type.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceImplementedByAbstractClass), fullyQualifiedName: "jsii-calc.compliance.IInterfaceImplementedByAbstractClass")]
    public interface IInterfaceImplementedByAbstractClass
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        string PropFromInterface
        {
            get;
        }
    }
}
