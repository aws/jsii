using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verify that object references can be passed inside collections.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ObjectRefsInCollections), fullyQualifiedName: "jsii-calc.ObjectRefsInCollections")]
    public class ObjectRefsInCollections : DeputyBase
    {
        /// <summary></summary>
        public ObjectRefsInCollections(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected ObjectRefsInCollections(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected ObjectRefsInCollections(DeputyProps props): base(props)
        {
        }

        /// <summary>Returns the sum of all values.</summary>
        /// <param name="values"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "sumFromArray", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"values\",\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"array\"}}}]")]
        public virtual double SumFromArray(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[] values)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[])}, new object[]{values});
        }

        /// <summary>Returns the sum of all values in a map.</summary>
        /// <param name="values"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "sumFromMap", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"values\",\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"map\"}}}]")]
        public virtual double SumFromMap(System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_> values)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>)}, new object[]{values});
        }
    }
}
