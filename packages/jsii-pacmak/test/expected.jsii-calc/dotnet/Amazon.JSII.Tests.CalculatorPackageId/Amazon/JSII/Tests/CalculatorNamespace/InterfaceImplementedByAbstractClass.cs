using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>
    /// awslabs/jsii#220
    /// Abstract return type
    /// </summary>
    public class InterfaceImplementedByAbstractClass : DeputyBase, IInterfaceImplementedByAbstractClass
    {
        [JsiiProperty("propFromInterface", "{\"primitive\":\"string\"}", true)]
        public string PropFromInterface
        {
            get;
        }
    }
}