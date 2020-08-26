using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.PythonSelf
{
    #pragma warning disable CS8618

    [JsiiByValue(fqn: "jsii-calc.PythonSelf.StructWithSelf")]
    public class StructWithSelf : Amazon.JSII.Tests.CalculatorNamespace.PythonSelf.IStructWithSelf
    {
        [JsiiProperty(name: "self", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Self
        {
            get;
            set;
        }
    }
}
