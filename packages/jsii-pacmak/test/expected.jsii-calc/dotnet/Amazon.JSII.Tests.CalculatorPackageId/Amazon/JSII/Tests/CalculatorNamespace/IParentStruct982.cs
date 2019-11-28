using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>https://github.com/aws/jsii/issues/982.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IParentStruct982), fullyQualifiedName: "jsii-calc.ParentStruct982")]
    public interface IParentStruct982
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"string\"}")]
        string Foo
        {
            get;
        }
    }
}
