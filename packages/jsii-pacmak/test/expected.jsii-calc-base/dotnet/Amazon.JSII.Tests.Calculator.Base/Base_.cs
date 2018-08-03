using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator.Base
{
    /// <summary>A base class.</summary>
    [JsiiClass(typeof(Base_), "@scope/jsii-calc-base.Base", "[]")]
    public abstract class Base_ : DeputyBase
    {
        protected Base_(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Base_(ByRefValue reference): base(reference)
        {
        }

        protected Base_(DeputyProps props): base(props)
        {
        }

        /// <returns>the name of the class (to verify native type names are created for derived classes).</returns>
        [JsiiMethod("typeName", "{\"primitive\":\"any\"}", "[]")]
        public virtual object TypeName()
        {
            return InvokeInstanceMethod<object>(new object[]{});
        }
    }
}