using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>
    /// awslabs/jsii#220
    /// Abstract return type
    /// </summary>
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