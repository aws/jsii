using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.ImplictBaseOfBase")]
    public class ImplictBaseOfBase : Amazon.JSII.Tests.CalculatorNamespace.IImplictBaseOfBase
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "goo", typeJson: "{\"primitive\":\"date\"}", isOverride: true)]
        public System.DateTime Goo
        {
            get;
            set;
        }

        /// <summary></summary>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Bar
        {
            get;
            set;
        }

        /// <summary></summary>
        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}", isOverride: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very Foo
        {
            get;
            set;
        }
    }
}
