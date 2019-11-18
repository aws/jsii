using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Make sure structs are un-decorated on the way in.</summary>
    /// <remarks>
    /// stability: Experimental
    /// see:
    /// https://github.com/aws/aws-cdk/issues/5066
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), fullyQualifiedName: "jsii-calc.JsonFormatter")]
    public class JsonFormatter : DeputyBase
    {
        protected JsonFormatter(ByRefValue reference): base(reference)
        {
        }

        protected JsonFormatter(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "stringify", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"any\"}}]")]
        public static string Stringify(object @value)
        {
            return InvokeStaticMethod<string>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{typeof(object)}, new object[]{@value});
        }
    }
}
