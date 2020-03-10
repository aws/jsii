using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ObjectWithPropertyProvider), fullyQualifiedName: "jsii-calc.compliance.ObjectWithPropertyProvider")]
    public class ObjectWithPropertyProvider : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ObjectWithPropertyProvider(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ObjectWithPropertyProvider(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provide", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.IObjectWithProperty\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.IObjectWithProperty Provide()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IObjectWithProperty>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ObjectWithPropertyProvider), new System.Type[]{}, new object[]{});
        }
    }
}
