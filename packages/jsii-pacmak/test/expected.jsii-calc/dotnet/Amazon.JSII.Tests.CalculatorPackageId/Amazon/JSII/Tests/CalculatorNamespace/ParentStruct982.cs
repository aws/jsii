using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>https://github.com/aws/jsii/issues/982.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.ParentStruct982")]
    public class ParentStruct982 : Amazon.JSII.Tests.CalculatorNamespace.IParentStruct982
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Foo
        {
            get;
            set;
        }
    }
}
