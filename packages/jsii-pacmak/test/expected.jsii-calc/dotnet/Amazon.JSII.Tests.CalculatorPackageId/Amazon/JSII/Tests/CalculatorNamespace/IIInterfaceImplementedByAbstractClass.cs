using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: awslabs/jsii#220 Abstract return type.</remarks>
    [JsiiInterface(typeof(IIInterfaceImplementedByAbstractClass), "jsii-calc.IInterfaceImplementedByAbstractClass")]
    public interface IIInterfaceImplementedByAbstractClass
    {
        [JsiiProperty("propFromInterface", "{\"primitive\":\"string\"}")]
        string PropFromInterface
        {
            get;
        }
    }
}