using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IExtendsInternalInterface), fullyQualifiedName: "jsii-calc.ExtendsInternalInterface")]
    public interface IExtendsInternalInterface
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Boom
        {
            get;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}")]
        string Prop
        {
            get;
        }
    }
}
