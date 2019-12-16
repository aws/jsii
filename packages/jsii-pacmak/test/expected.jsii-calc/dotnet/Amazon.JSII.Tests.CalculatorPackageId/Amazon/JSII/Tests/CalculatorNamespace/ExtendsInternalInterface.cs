using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.ExtendsInternalInterface")]
    public class ExtendsInternalInterface : Amazon.JSII.Tests.CalculatorNamespace.IExtendsInternalInterface
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}", isOverride: true)]
        public bool Boom
        {
            get;
            set;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Prop
        {
            get;
            set;
        }
    }
}
