using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.EnumDispenser), fullyQualifiedName: "jsii-calc.EnumDispenser")]
    public class EnumDispenser : DeputyBase
    {
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected EnumDispenser(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected EnumDispenser(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "randomIntegerLikeEnum", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.AllTypesEnum\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum RandomIntegerLikeEnum()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.AllTypesEnum>(typeof(Amazon.JSII.Tests.CalculatorNamespace.EnumDispenser), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "randomStringLikeEnum", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.StringEnum\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.StringEnum RandomStringLikeEnum()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.StringEnum>(typeof(Amazon.JSII.Tests.CalculatorNamespace.EnumDispenser), new System.Type[]{}, new object[]{});
        }
    }
}
