using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.ExtendsInternalInterface")]
    public class ExtendsInternalInterface : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IExtendsInternalInterface
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}", isOverride: true)]
        public bool Boom
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Prop
        {
            get;
            set;
        }
    }
}
