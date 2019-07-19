using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Just because we can.</summary>
    /// <remarks>stability: External</remarks>
    [JsiiClass(nativeType: typeof(StructPassing), fullyQualifiedName: "jsii-calc.StructPassing")]
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

        /// <remarks>stability: External</remarks>
        [JsiiMethod(name: "howManyVarArgsDidIPass", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"_positional\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"inputs\",\"variadic\":true,\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"}}]")]
        public static double HowManyVarArgsDidIPass(double _positional, ITopLevelStruct inputs)
        {
            return InvokeStaticMethod<double>(typeof(StructPassing), new object[]{_positional, inputs});
        }

        /// <remarks>stability: External</remarks>
        [JsiiMethod(name: "roundTrip", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"}}", parametersJson: "[{\"name\":\"_positional\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"input\",\"type\":{\"fqn\":\"jsii-calc.TopLevelStruct\"}}]")]
        public static ITopLevelStruct RoundTrip(double _positional, ITopLevelStruct input)
        {
            return InvokeStaticMethod<ITopLevelStruct>(typeof(StructPassing), new object[]{_positional, input});
        }
    }
}