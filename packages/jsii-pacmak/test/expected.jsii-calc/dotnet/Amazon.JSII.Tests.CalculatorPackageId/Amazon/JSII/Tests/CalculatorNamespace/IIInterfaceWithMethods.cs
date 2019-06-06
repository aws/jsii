using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IIInterfaceWithMethods), fullyQualifiedName: "jsii-calc.IInterfaceWithMethods")]
    public interface IIInterfaceWithMethods
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        string Value
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "doThings")]
        void DoThings();
    }
}