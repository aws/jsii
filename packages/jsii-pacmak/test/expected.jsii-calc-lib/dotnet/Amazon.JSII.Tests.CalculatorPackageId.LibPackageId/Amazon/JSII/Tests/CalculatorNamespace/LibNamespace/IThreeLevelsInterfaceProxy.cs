using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Interface that inherits from packages 2 levels up the tree.</summary>
    /// <remarks>
    /// Their presence validates that .NET/Java/jsii-reflect can track all fields
    /// far enough up the tree.
    /// stability: deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IIThreeLevelsInterface), fullyQualifiedName: "@scope/jsii-calc-lib.IThreeLevelsInterface")]
    [System.Obsolete()]
    internal sealed class IThreeLevelsInterfaceProxy : DeputyBase, IIThreeLevelsInterface
    {
        private IThreeLevelsInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiMethod(name: "baz")]
        [System.Obsolete()]
        public void Baz()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "bar")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
