using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    /// <remarks>summary: A base class.</remarks>
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

        /// <remarks>returns: the name of the class (to verify native type names are created for derived classes).</remarks>
        [JsiiMethod("typeName", "{\"primitive\":\"any\"}", "[]")]
        public virtual object TypeName()
        {
            return InvokeInstanceMethod<object>(new object[]{});
        }
    }
}