using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    [JsiiByValue(fqn: "jsii-calc.submodule.child.KwargsProps")]
    public class KwargsProps : Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.IKwargsProps
    {
        [JsiiOptional]
        [JsiiProperty(name: "extra", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Extra
        {
            get;
            set;
        }

        [JsiiProperty(name: "prop", typeJson: "{\"fqn\":\"jsii-calc.submodule.child.SomeEnum\"}", isOverride: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.SomeEnum Prop
        {
            get;
            set;
        }
    }
}
