using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>awslabs/jsii#220 Abstract return type.</summary>
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIInterfaceImplementedByAbstractClass), fullyQualifiedName: "jsii-calc.IInterfaceImplementedByAbstractClass")]
    public interface IIInterfaceImplementedByAbstractClass
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        string PropFromInterface
        {
            get;
        }
    }
}
