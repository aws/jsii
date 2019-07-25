using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies proper type handling through dynamic overrides.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DataRenderer), fullyQualifiedName: "jsii-calc.DataRenderer")]
    public class DataRenderer : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public DataRenderer(): base(new DeputyProps(new object[]{}))
        {
        }

        protected DataRenderer(ByRefValue reference): base(reference)
        {
        }

        protected DataRenderer(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "render", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"data\",\"optional\":true,\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"}}]")]
        public virtual string Render(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct data)
        {
            return InvokeInstanceMethod<string>(new object[]{data});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "renderMap", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"map\",\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}}]")]
        public virtual string RenderMap(System.Collections.Generic.IDictionary<string, object> map)
        {
            return InvokeInstanceMethod<string>(new object[]{map});
        }
    }
}
