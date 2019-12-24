using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ObjectWithPropertyProvider), fullyQualifiedName: "jsii-calc.ObjectWithPropertyProvider")]
    public class ObjectWithPropertyProvider : DeputyBase
    {
<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected ObjectWithPropertyProvider(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected ObjectWithPropertyProvider(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provide", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IObjectWithProperty\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IObjectWithProperty Provide()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IObjectWithProperty>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ObjectWithPropertyProvider), new System.Type[]{}, new object[]{});
        }
    }
}
