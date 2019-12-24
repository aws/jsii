using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    /// <summary>A base class.</summary>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.Base), fullyQualifiedName: "@scope/jsii-calc-base.Base")]
    public abstract class Base : DeputyBase
    {
        /// <summary></summary>
        protected Base(): base(new DeputyProps(new object[]{}))
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected Base(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected Base(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <returns>the name of the class (to verify native type names are created for derived classes).</returns>
        [JsiiMethod(name: "typeName", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public virtual object TypeName()
        {
            return InvokeInstanceMethod<object>(new System.Type[]{}, new object[]{});
        }
    }
}
