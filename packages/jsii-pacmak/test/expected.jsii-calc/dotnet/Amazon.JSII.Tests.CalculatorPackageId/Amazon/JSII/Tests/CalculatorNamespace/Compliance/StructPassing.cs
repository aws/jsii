using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Just because we can.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: External
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.StructPassing), fullyQualifiedName: "jsii-calc.compliance.StructPassing")]
    public class StructPassing : DeputyBase
    {
        public StructPassing(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected StructPassing(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected StructPassing(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: External
        /// </remarks>
        [JsiiMethod(name: "howManyVarArgsDidIPass", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"_positional\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"inputs\",\"type\":{\"fqn\":\"jsii-calc.compliance.TopLevelStruct\"},\"variadic\":true}]")]
        public static double HowManyVarArgsDidIPass(double positional, params Amazon.JSII.Tests.CalculatorNamespace.Compliance.ITopLevelStruct[] inputs)
        {
            return InvokeStaticMethod<double>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.StructPassing), new System.Type[]{typeof(double), typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ITopLevelStruct[])}, new object[]{positional, inputs});
        }

        /// <remarks>
        /// <strong>Stability</strong>: External
        /// </remarks>
        [JsiiMethod(name: "roundTrip", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.TopLevelStruct\"}}", parametersJson: "[{\"name\":\"_positional\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"input\",\"type\":{\"fqn\":\"jsii-calc.compliance.TopLevelStruct\"}}]")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.ITopLevelStruct RoundTrip(double positional, Amazon.JSII.Tests.CalculatorNamespace.Compliance.ITopLevelStruct input)
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.ITopLevelStruct>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.StructPassing), new System.Type[]{typeof(double), typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ITopLevelStruct)}, new object[]{positional, input});
        }
    }
}
