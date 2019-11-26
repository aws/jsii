using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ObjectWithPropertyProvider), fullyQualifiedName: "jsii-calc.ObjectWithPropertyProvider")]
    public class ObjectWithPropertyProvider : DeputyBase
    {
        protected ObjectWithPropertyProvider(ByRefValue reference): base(reference)
        {
        }

        protected ObjectWithPropertyProvider(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "provide", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IObjectWithProperty\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IObjectWithProperty Provide()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IObjectWithProperty>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ObjectWithPropertyProvider), new System.Type[]{}, new object[]{});
        }
    }
}
