using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>Interface that inherits from packages 2 levels up the tree.</summary>
    /// <remarks>
    /// Their presence validates that .NET/Java/jsii-reflect can track all fields
    /// far enough up the tree.
    /// 
    /// stability: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IThreeLevelsInterface), fullyQualifiedName: "@scope/jsii-calc-lib.IThreeLevelsInterface")]
    [System.Obsolete()]
    internal sealed class IThreeLevelsInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IThreeLevelsInterface
    {
        private IThreeLevelsInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "baz")]
        [System.Obsolete()]
        public void Baz()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        [JsiiMethod(name: "bar")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
