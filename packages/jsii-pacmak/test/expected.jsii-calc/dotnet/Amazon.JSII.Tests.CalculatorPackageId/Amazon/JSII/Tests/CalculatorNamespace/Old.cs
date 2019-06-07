using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Old class.</summary>
    /// <remarks>
    /// deprecated: Use the new class
    /// </remarks>
    [JsiiClass(nativeType: typeof(Old), fullyQualifiedName: "jsii-calc.Old")]
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
        [JsiiMethod(name: "doAThing")]
        public virtual void DoAThing()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
