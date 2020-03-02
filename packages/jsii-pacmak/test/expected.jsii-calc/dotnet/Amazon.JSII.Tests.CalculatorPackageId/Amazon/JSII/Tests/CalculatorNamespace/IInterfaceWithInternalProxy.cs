using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IInterfaceWithInternal), fullyQualifiedName: "jsii-calc.IInterfaceWithInternal")]
    internal sealed class IInterfaceWithInternalProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithInternal
    {
        private IInterfaceWithInternalProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "visible")]
        public void Visible()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
