using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiInterface(nativeType: typeof(IExtendsInternalInterface), fullyQualifiedName: "jsii-calc.ExtendsInternalInterface")]
    public interface IExtendsInternalInterface
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Boom
        {
            get;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}")]
        string Prop
        {
            get;
        }
    }
}