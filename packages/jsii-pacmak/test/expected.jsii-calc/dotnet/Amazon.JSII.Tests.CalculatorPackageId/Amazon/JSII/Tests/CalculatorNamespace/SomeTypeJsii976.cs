using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SomeTypeJsii976), fullyQualifiedName: "jsii-calc.SomeTypeJsii976")]
    public class SomeTypeJsii976 : DeputyBase
    {
        public SomeTypeJsii976(): base(new DeputyProps(new object[]{}))
        {
        }

        protected SomeTypeJsii976(ByRefValue reference): base(reference)
        {
        }

        protected SomeTypeJsii976(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnAnonymous", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object ReturnAnonymous()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.SomeTypeJsii976), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnReturn", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IReturnJsii976\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IReturnJsii976 ReturnReturn()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IReturnJsii976>(typeof(Amazon.JSII.Tests.CalculatorNamespace.SomeTypeJsii976), new System.Type[]{}, new object[]{});
        }
    }
}
