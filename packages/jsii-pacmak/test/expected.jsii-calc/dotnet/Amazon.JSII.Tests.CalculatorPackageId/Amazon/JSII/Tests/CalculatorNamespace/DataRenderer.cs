using Amazon.JSII.Runtime.Deputy;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies proper type handling through dynamic overrides.</summary>
    /// <remarks>stability: Experimental</remarks>
    [JsiiClass(nativeType: typeof(DataRenderer), fullyQualifiedName: "jsii-calc.DataRenderer")]
    public class DataRenderer : DeputyBase
    {
        /// <remarks>stability: Experimental</remarks>
        public DataRenderer(): base(new DeputyProps(new object[]{}))
        {
        }

        protected DataRenderer(ByRefValue reference): base(reference)
        {
        }

        protected DataRenderer(DeputyProps props): base(props)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "render", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"data\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"},\"optional\":true}]")]
        public virtual string Render(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct data)
        {
            return InvokeInstanceMethod<string>(new object[]{data});
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "renderMap", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"map\",\"type\":{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"any\"}}}}]")]
        public virtual string RenderMap(IDictionary<string, object> map)
        {
            return InvokeInstanceMethod<string>(new object[]{map});
        }
    }
}