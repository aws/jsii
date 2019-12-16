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
        /// <summary></summary>
        public StructPassing(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected StructPassing(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected StructPassing(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="positional"></param>
        /// <param name="inputs"></param>
        /// <remarks>
        /// stability: External
        /// </remarks>
        [JsiiMethod(name: "howManyVarArgsDidIPass", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"_positional\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"inputs\",\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"},\"variadic\":true}]")]
        public static double HowManyVarArgsDidIPass(double positional, params Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct[] inputs)
        {
            return InvokeStaticMethod<double>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StructPassing), new System.Type[]{typeof(double), typeof(Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct[])}, new object[]{positional, inputs});
        }

        /// <summary></summary>
        /// <param name="positional"></param>
        /// <param name="input"></param>
        /// <remarks>
        /// stability: External
        /// </remarks>
        [JsiiMethod(name: "roundTrip", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"}}", parametersJson: "[{\"name\":\"_positional\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"input\",\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"}}]")]
        public static Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct RoundTrip(double positional, Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct input)
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StructPassing), new System.Type[]{typeof(double), typeof(Amazon.JSII.Tests.CalculatorNamespace.ITopLevelStruct)}, new object[]{positional, input});
        }
    }
}
