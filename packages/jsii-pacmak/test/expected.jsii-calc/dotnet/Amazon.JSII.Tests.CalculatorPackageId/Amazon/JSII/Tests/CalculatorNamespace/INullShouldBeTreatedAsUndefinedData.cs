using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(INullShouldBeTreatedAsUndefinedData), fullyQualifiedName: "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    public interface INullShouldBeTreatedAsUndefinedData
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "arrayWithThreeElementsAndUndefinedAsSecondArgument", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"array\"}}")]
        object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "thisShouldBeUndefined", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        object? ThisShouldBeUndefined
        {
            get
            {
                return null;
            }
        }
    }
}
