using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>awslabs/jsii#220 Abstract return type.</summary>
    [JsiiInterface(typeof(IIInterfaceImplementedByAbstractClass), "jsii-calc.IInterfaceImplementedByAbstractClass")]
    public interface IIInterfaceImplementedByAbstractClass
    {
        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        string PropFromInterface
        {
            get;
        }
    }
}