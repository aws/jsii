using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Verifies proper type handling through dynamic overrides.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.DataRenderer), fullyQualifiedName: "jsii-calc.compliance.DataRenderer")]
    public class DataRenderer : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public DataRenderer(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DataRenderer(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DataRenderer(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "render", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"data\",\"optional\":true,\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"}}]")]
        public virtual string Render(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct? data = null)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct)}, new object?[]{data});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "renderArbitrary", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"data\",\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}}]")]
        public virtual string RenderArbitrary(System.Collections.Generic.IDictionary<string, object> data)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(System.Collections.Generic.IDictionary<string, object>)}, new object[]{data});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "renderMap", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"map\",\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}}]")]
        public virtual string RenderMap(System.Collections.Generic.IDictionary<string, object> map)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(System.Collections.Generic.IDictionary<string, object>)}, new object[]{map});
        }
    }
}
