using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IStructWithJavaReservedWords), fullyQualifiedName: "jsii-calc.StructWithJavaReservedWords")]
    public interface IStructWithJavaReservedWords
    {
        [JsiiProperty(name: "default", typeJson: "{\"primitive\":\"string\"}")]
        string Default
        {
            get;
        }

        [JsiiProperty(name: "assert", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string? Assert
        {
            get
            {
                return null;
            }
        }

        [JsiiProperty(name: "result", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string? Result
        {
            get
            {
                return null;
            }
        }

        [JsiiProperty(name: "that", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string? That
        {
            get
            {
                return null;
            }
        }
    }
}
