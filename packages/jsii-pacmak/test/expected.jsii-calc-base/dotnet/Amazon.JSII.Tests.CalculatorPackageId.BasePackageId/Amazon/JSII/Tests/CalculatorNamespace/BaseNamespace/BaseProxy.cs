using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    /// <summary>A base class.</summary>
    [JsiiInterfaceProxy(typeof(Base), "@scope/jsii-calc-base.Base")]
    internal class BaseProxy : Base
    {
        private BaseProxy(ByRefValue reference): base(reference)
        {
        }
    }
}