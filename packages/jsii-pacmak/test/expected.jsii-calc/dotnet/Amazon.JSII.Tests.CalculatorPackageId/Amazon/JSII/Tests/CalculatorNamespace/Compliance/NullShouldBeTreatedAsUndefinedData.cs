using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    #pragma warning disable CS8618

    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.NullShouldBeTreatedAsUndefinedData")]
    public class NullShouldBeTreatedAsUndefinedData : Amazon.JSII.Tests.CalculatorNamespace.Compliance.INullShouldBeTreatedAsUndefinedData
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "arrayWithThreeElementsAndUndefinedAsSecondArgument", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"array\"}}", isOverride: true)]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "thisShouldBeUndefined", typeJson: "{\"primitive\":\"any\"}", isOptional: true, isOverride: true)]
        public object? ThisShouldBeUndefined
        {
            get;
            set;
        }
    }
}
