using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.SomeTypeJsii976), fullyQualifiedName: "jsii-calc.compliance.SomeTypeJsii976")]
    public class SomeTypeJsii976 : DeputyBase
    {
        public SomeTypeJsii976(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected SomeTypeJsii976(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected SomeTypeJsii976(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnAnonymous", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object ReturnAnonymous()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.SomeTypeJsii976), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnReturn", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.IReturnJsii976\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.IReturnJsii976 ReturnReturn()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IReturnJsii976>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.SomeTypeJsii976), new System.Type[]{}, new object[]{});
        }
    }
}
