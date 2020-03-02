using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.JSII417PublicBaseOfBase), fullyQualifiedName: "jsii-calc.JSII417PublicBaseOfBase")]
    public class JSII417PublicBaseOfBase : DeputyBase
    {
        public JSII417PublicBaseOfBase(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JSII417PublicBaseOfBase(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JSII417PublicBaseOfBase(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "makeInstance", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.JSII417PublicBaseOfBase\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.JSII417PublicBaseOfBase MakeInstance()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.JSII417PublicBaseOfBase>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JSII417PublicBaseOfBase), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "foo")]
        public virtual void Foo()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "hasRoot", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool HasRoot
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
