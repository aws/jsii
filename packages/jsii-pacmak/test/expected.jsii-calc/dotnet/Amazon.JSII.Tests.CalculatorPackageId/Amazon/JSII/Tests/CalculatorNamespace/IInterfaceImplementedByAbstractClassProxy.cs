using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>awslabs/jsii#220 Abstract return type.</summary>
    [JsiiTypeProxy(typeof(IIInterfaceImplementedByAbstractClass), "jsii-calc.IInterfaceImplementedByAbstractClass")]
    internal sealed class IInterfaceImplementedByAbstractClassProxy : DeputyBase, IIInterfaceImplementedByAbstractClass
    {
        private IInterfaceImplementedByAbstractClassProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("propFromInterface", "{\"type\":{\"primitive\":\"string\"}}")]
        public string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }
    }
}