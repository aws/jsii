using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.EnumDispenser), fullyQualifiedName: "jsii-calc.compliance.EnumDispenser")]
    public class EnumDispenser : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected EnumDispenser(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected EnumDispenser(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "randomIntegerLikeEnum", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.AllTypesEnum\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.AllTypesEnum RandomIntegerLikeEnum()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.AllTypesEnum>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.EnumDispenser), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "randomStringLikeEnum", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.StringEnum\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.StringEnum RandomStringLikeEnum()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.StringEnum>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.EnumDispenser), new System.Type[]{}, new object[]{});
        }
    }
}
