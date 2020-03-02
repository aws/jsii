using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace
{
    #pragma warning disable CS8618

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
