using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.submodule.child.SomeStruct")]
    public class SomeStruct : Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.ISomeStruct
    {
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
