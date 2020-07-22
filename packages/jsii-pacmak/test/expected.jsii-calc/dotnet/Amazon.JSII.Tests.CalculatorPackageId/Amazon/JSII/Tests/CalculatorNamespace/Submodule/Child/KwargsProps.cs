using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.submodule.child.KwargsProps")]
    public class KwargsProps : Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.IKwargsProps
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "extra", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Extra
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "prop", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.SomeEnum\"}", isOverride: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.SomeEnum Prop
        {
            get;
            set;
        }
    }
}
