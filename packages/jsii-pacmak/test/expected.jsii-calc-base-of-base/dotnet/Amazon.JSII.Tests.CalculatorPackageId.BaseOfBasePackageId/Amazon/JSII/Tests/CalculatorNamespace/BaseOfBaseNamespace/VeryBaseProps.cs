using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace
{
    [JsiiByValue(fqn: "@scope/jsii-calc-base-of-base.VeryBaseProps")]
    public class VeryBaseProps : Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.IVeryBaseProps
    {
        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}", isOverride: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very Foo
        {
            get;
            set;
        }
    }
}
