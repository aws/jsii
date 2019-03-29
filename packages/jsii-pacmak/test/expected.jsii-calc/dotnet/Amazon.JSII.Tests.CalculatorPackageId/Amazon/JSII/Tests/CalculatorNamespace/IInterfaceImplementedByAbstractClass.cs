using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: awslabs/jsii#220 Abstract return type.</remarks>
    [JsiiInterface(typeof(IInterfaceImplementedByAbstractClass), "jsii-calc.InterfaceImplementedByAbstractClass")]
    public interface IInterfaceImplementedByAbstractClass
    {
        [JsiiProperty("propFromInterface", "{\"primitive\":\"string\"}")]
        string PropFromInterface
        {
            get;
        }
    }
}