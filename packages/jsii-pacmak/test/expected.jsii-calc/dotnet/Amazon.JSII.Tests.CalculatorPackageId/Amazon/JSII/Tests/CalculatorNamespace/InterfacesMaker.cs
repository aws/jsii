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
<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected InterfacesMaker(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected InterfacesMaker(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="count"></param>
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
