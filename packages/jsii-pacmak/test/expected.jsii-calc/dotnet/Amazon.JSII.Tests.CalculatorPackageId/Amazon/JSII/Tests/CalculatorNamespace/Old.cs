using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Old class.</summary>
    /// <remarks>
    /// stability: deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Old), fullyQualifiedName: "jsii-calc.Old")]
    [System.Obsolete("Use the new class")]
    public class Old : DeputyBase
    {
        public Old(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Old(ByRefValue reference): base(reference)
        {
        }

        protected Old(DeputyProps props): base(props)
        {
        }

        /// <summary>Doo wop that thing.</summary>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiMethod(name: "doAThing")]
        [System.Obsolete()]
        public virtual void DoAThing()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
