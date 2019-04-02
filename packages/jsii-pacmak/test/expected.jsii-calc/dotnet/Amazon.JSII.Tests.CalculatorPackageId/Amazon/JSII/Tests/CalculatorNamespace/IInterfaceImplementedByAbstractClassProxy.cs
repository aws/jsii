using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: awslabs/jsii#220 Abstract return type.</remarks>
    [JsiiTypeProxy(typeof(IIInterfaceImplementedByAbstractClass), "jsii-calc.IInterfaceImplementedByAbstractClass")]
    internal sealed class IInterfaceImplementedByAbstractClassProxy : DeputyBase, IIInterfaceImplementedByAbstractClass
    {
        private IInterfaceImplementedByAbstractClassProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("propFromInterface", "{\"primitive\":\"string\"}")]
        public string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }
    }
}