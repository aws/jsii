using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verify that object references can be passed inside collections.</summary>
    [JsiiClass(nativeType: typeof(ObjectRefsInCollections), fullyQualifiedName: "jsii-calc.ObjectRefsInCollections")]
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
        [JsiiMethod(name: "sumFromArray", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"values\",\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}}]")]
        public virtual double SumFromArray(Value_[] values)
        {
            return InvokeInstanceMethod<double>(new object[]{values});
        }

        /// <summary>Returns the sum of all values in a map.</summary>
        [JsiiMethod(name: "sumFromMap", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"values\",\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}}]")]
        public virtual double SumFromMap(IDictionary<string, Value_> values)
        {
            return InvokeInstanceMethod<double>(new object[]{values});
        }
    }
}