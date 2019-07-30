using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiByValue]
    public class NullShouldBeTreatedAsUndefinedData : Amazon.JSII.Tests.CalculatorNamespace.INullShouldBeTreatedAsUndefinedData
    {
        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "arrayWithThreeElementsAndUndefinedAsSecondArgument", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"any\"}}}", isOverride: true)]
        public object[] ArrayWithThreeElementsAndUndefinedAsSecondArgument
        {
            get;
            set;
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "thisShouldBeUndefined", typeJson: "{\"primitive\":\"any\"}", isOptional: true, isOverride: true)]
        public object ThisShouldBeUndefined
        {
            get;
            set;
        }
    }
}