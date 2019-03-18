using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>
    /// awslabs/jsii#220
    /// Abstract return type
    /// </summary>
    [JsiiByValue]
    public class InterfaceImplementedByAbstractClass : IInterfaceImplementedByAbstractClass
    {
        [JsiiProperty("propFromInterface", "{\"primitive\":\"string\"}", true)]
        public string PropFromInterface
        {
            get;
            set;
        }
    }
}