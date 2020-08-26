using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Make sure that setters are properly called on objects with interfaces.</summary>
    [JsiiInterface(nativeType: typeof(IObjectWithProperty), fullyQualifiedName: "jsii-calc.IObjectWithProperty")]
    public interface IObjectWithProperty
    {
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        string Property
        {
            get;
            set;
        }
        [JsiiMethod(name: "wasSet", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}")]
        bool WasSet();
    }
}
