using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.StructUnionConsumer), fullyQualifiedName: "jsii-calc.StructUnionConsumer")]
    public class StructUnionConsumer : DeputyBase
    {
        protected StructUnionConsumer(ByRefValue reference): base(reference)
        {
        }

        protected StructUnionConsumer(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "isStructA", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"struct\",\"type\":{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.StructA\"},{\"fqn\":\"jsii-calc.StructB\"}]}}}]")]
        public static bool IsStructA(object @struct)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StructUnionConsumer), new System.Type[]{typeof(object)}, new object[]{@struct});
        }

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
