using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Just because we can.</summary>
    /// <remarks>
    /// stability: External
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.StructPassing), fullyQualifiedName: "jsii-calc.StructPassing")]
    public class StructPassing : DeputyBase
    {
        public StructPassing(): base(new DeputyProps(new object[]{}))
        {
        }

        protected StructPassing(ByRefValue reference): base(reference)
        {
        }

        protected StructPassing(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: External
        /// </remarks>
        [JsiiMethod(name: "howManyVarArgsDidIPass", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"_positional\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"inputs\",\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"},\"variadic\":true}]")]
        public static double HowManyVarArgsDidIPass(double positional, params Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct[] inputs)
        {
            return InvokeStaticMethod<double>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StructPassing), new object[]{positional, inputs});
        }

        /// <remarks>
        /// stability: External
        /// </remarks>
        [JsiiMethod(name: "roundTrip", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"}}", parametersJson: "[{\"name\":\"_positional\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"input\",\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"}}]")]
        public static Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct RoundTrip(double positional, Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct input)
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StructPassing), new object[]{positional, input});
        }
    }
}
