using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Checks the current file permissions are cool (no funky UMASK down-scoping happened).</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>See</strong>: https://github.com/aws/jsii/issues/1765
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.UmaskCheck), fullyQualifiedName: "jsii-calc.UmaskCheck")]
    public class UmaskCheck : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UmaskCheck(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UmaskCheck(DeputyProps props): base(props)
        {
        }

        /// <summary>This should return 0o644 (-rw-r--r--).</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "mode", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public static double Mode()
        {
            return InvokeStaticMethod<double>(typeof(Amazon.JSII.Tests.CalculatorNamespace.UmaskCheck), new System.Type[]{}, new object[]{});
        }
    }
}
