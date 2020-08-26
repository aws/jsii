using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child
{
    #pragma warning disable CS8618

    [JsiiByValue(fqn: "jsii-calc.submodule.child.Structure")]
    public class Structure : Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.IStructure
    {
        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}", isOverride: true)]
        public bool Bool
        {
            get;
            set;
        }
    }
}
