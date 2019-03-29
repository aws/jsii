using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// deprecated: Use the new class
    /// summary: Old class.
    /// </remarks>
    [JsiiClass(typeof(Old), "jsii-calc.Old", "[]")]
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

        /// <remarks>summary: Doo wop that thing.</remarks>
        [JsiiMethod("doAThing", null, "[]")]
        public virtual void DoAThing()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}