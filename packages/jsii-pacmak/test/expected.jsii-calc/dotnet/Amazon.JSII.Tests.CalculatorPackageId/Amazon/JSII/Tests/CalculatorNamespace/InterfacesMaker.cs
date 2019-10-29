using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can return arrays of interfaces See aws/aws-cdk#2362.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfacesMaker), fullyQualifiedName: "jsii-calc.InterfacesMaker")]
    public class InterfacesMaker : DeputyBase
    {
        protected InterfacesMaker(ByRefValue reference): base(reference)
        {
        }

        protected InterfacesMaker(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "makeInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"},\"kind\":\"array\"}}}", parametersJson: "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]")]
        public static Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable[] MakeInterfaces(double count)
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfacesMaker), new System.Type[]{typeof(double)}, new object[]{count});
        }
    }
}
