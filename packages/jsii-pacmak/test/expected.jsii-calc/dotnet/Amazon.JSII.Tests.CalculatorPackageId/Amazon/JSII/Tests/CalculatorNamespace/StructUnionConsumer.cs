using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.StructUnionConsumer), fullyQualifiedName: "jsii-calc.StructUnionConsumer")]
    public class StructUnionConsumer : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected StructUnionConsumer(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected StructUnionConsumer(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="struct"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "isStructA", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"struct\",\"type\":{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.StructA\"},{\"fqn\":\"jsii-calc.StructB\"}]}}}]")]
        public static bool IsStructA(object @struct)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StructUnionConsumer), new System.Type[]{typeof(object)}, new object[]{@struct});
        }

        /// <summary></summary>
        /// <param name="struct"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "isStructB", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"struct\",\"type\":{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.StructA\"},{\"fqn\":\"jsii-calc.StructB\"}]}}}]")]
        public static bool IsStructB(object @struct)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StructUnionConsumer), new System.Type[]{typeof(object)}, new object[]{@struct});
        }
    }
}
