using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can return arrays of interfaces See aws/aws-cdk#2362.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfacesMaker), fullyQualifiedName: "jsii-calc.InterfacesMaker")]
    public class InterfacesMaker : DeputyBase
    {
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected InterfacesMaker(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected InterfacesMaker(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "makeInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.IDoublable\"},\"kind\":\"array\"}}}", parametersJson: "[{\"name\":\"count\",\"type\":{\"primitive\":\"number\"}}]")]
        public static Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable[] MakeInterfaces(double count)
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IDoublable[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfacesMaker), new System.Type[]{typeof(double)}, new object[]{count});
        }
    }
}
