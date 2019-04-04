using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    /// <summary>A base class.</summary>
    [JsiiClass(typeof(Base), "@scope/jsii-calc-base.Base", "[]")]
    public abstract class Base : DeputyBase
    {
        protected Base(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Base(ByRefValue reference): base(reference)
        {
        }

        protected Base(DeputyProps props): base(props)
        {
        }

        /// <returns>the name of the class (to verify native type names are created for derived classes).</returns>
        [JsiiMethod("typeName", "{\"primitive\":\"any\",\"nullable\":true}", "[]")]
        public virtual object TypeName()
        {
            return InvokeInstanceMethod<object>(new object[]{});
        }
    }
}