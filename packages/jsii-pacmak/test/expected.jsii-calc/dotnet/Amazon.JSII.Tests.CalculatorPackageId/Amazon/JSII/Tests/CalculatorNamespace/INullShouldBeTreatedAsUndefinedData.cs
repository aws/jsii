using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(INullShouldBeTreatedAsUndefinedData), fullyQualifiedName: "jsii-calc.NullShouldBeTreatedAsUndefinedData")]
    public interface INullShouldBeTreatedAsUndefinedData
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "arrayWithThreeElementsAndUndefinedAsSecondArgument", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"array\"}}")]
        object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "thisShouldBeUndefined", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        object ThisShouldBeUndefined
        {
            get
            {
                return null;
            }
        }
    }
}
