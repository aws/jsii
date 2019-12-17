using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Old class.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Old), fullyQualifiedName: "jsii-calc.Old")]
    [System.Obsolete("Use the new class")]
    public class Old : DeputyBase
    {
        /// <summary></summary>
        public Old(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected Old(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected Old(DeputyProps props): base(props)
        {
        }

        /// <summary>Doo wop that thing.</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiMethod(name: "doAThing")]
        [System.Obsolete()]
        public virtual void DoAThing()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
