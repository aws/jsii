using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>awslabs/jsii#220 Abstract return type.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IInterfaceImplementedByAbstractClass), fullyQualifiedName: "jsii-calc.compliance.IInterfaceImplementedByAbstractClass")]
    internal sealed class IInterfaceImplementedByAbstractClassProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IInterfaceImplementedByAbstractClass
    {
        private IInterfaceImplementedByAbstractClassProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "propFromInterface", typeJson: "{\"primitive\":\"string\"}")]
        public string PropFromInterface
        {
            get => GetInstanceProperty<string>();
        }
    }
}
