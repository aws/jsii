using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;
using System.Collections.Generic;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>Verify that object references can be passed inside collections.</summary>
    [JsiiClass(typeof(ObjectRefsInCollections), "jsii-calc.ObjectRefsInCollections", "[]")]
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

        /// <summary>Returns the sum of all values</summary>
        [JsiiMethod("sumFromArray", "{\"primitive\":\"number\"}", "[{\"name\":\"values\",\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}}]")]
        public virtual double SumFromArray(Value_[] values)
        {
            return InvokeMethod<double>(new object[]{values});
        }

        /// <summary>Returns the sum of all values in a map</summary>
        [JsiiMethod("sumFromMap", "{\"primitive\":\"number\"}", "[{\"name\":\"values\",\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}}]")]
        public virtual double SumFromMap(IDictionary<string, Value_> values)
        {
            return InvokeMethod<double>(new object[]{values});
        }
    }
}