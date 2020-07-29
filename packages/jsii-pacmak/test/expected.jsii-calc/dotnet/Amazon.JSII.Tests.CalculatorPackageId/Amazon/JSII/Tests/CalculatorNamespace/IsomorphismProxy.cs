using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Checks the "same instance" isomorphism is preserved within the constructor.</summary>
    /// <remarks>
    /// Create a subclass of this, and assert that <c>this.myself()</c> actually returns
    /// <c>this</c> from within the constructor.
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Isomorphism), fullyQualifiedName: "jsii-calc.Isomorphism")]
    internal sealed class IsomorphismProxy : Amazon.JSII.Tests.CalculatorNamespace.Isomorphism
    {
        private IsomorphismProxy(ByRefValue reference): base(reference)
        {
        }
    }
}
