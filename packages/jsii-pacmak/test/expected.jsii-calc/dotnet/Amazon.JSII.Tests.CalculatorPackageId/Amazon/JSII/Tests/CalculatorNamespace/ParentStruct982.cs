using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    /// <summary>https://github.com/aws/jsii/issues/982.</summary>
    [JsiiByValue(fqn: "jsii-calc.ParentStruct982")]
    public class ParentStruct982 : Amazon.JSII.Tests.CalculatorNamespace.IParentStruct982
    {
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Foo
        {
            get;
            set;
        }
    }
}
