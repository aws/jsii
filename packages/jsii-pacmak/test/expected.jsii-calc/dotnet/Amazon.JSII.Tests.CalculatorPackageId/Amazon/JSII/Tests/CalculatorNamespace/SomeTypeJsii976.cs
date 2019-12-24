using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SomeTypeJsii976), fullyQualifiedName: "jsii-calc.SomeTypeJsii976")]
    public class SomeTypeJsii976 : DeputyBase
    {
        /// <summary></summary>
        public SomeTypeJsii976(): base(new DeputyProps(new object[]{}))
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected SomeTypeJsii976(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected SomeTypeJsii976(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnAnonymous", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object ReturnAnonymous()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.SomeTypeJsii976), new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnReturn", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IReturnJsii976\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IReturnJsii976 ReturnReturn()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IReturnJsii976>(typeof(Amazon.JSII.Tests.CalculatorNamespace.SomeTypeJsii976), new System.Type[]{}, new object[]{});
        }
    }
}
