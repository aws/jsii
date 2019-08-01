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
        public ObjectRefsInCollections(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ObjectRefsInCollections(ByRefValue reference): base(reference)
        {
        }

        protected ObjectRefsInCollections(DeputyProps props): base(props)
        {
        }

        /// <summary>Returns the sum of all values.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "sumFromArray", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"values\",\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"array\"}}}]")]
        public virtual double SumFromArray(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[] values)
        {
            return InvokeInstanceMethod<double>(new object[]{values});
        }

        /// <summary>Returns the sum of all values in a map.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "sumFromMap", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"values\",\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"map\"}}}]")]
        public virtual double SumFromMap(System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_> values)
        {
            return InvokeInstanceMethod<double>(new object[]{values});
        }
    }
}
