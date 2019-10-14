using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.EnumDispenser), fullyQualifiedName: "jsii-calc.EnumDispenser")]
    public class EnumDispenser : DeputyBase
    {
        protected EnumDispenser(ByRefValue reference): base(reference)
        {
        }

        protected EnumDispenser(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "randomIntegerLikeEnum", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum RandomIntegerLikeEnum()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum>(typeof(Amazon.JSII.Tests.CalculatorNamespace.EnumDispenser), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "randomStringLikeEnum", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.StringEnum\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.StringEnum RandomStringLikeEnum()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.StringEnum>(typeof(Amazon.JSII.Tests.CalculatorNamespace.EnumDispenser), new System.Type[]{}, new object[]{});
        }
    }
}
