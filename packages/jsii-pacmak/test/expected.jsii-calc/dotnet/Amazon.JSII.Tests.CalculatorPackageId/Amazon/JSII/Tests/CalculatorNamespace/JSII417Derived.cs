using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(JSII417Derived), fullyQualifiedName: "jsii-calc.JSII417Derived", parametersJson: "[{\"name\":\"property\",\"type\":{\"primitive\":\"string\"}}]")]
    public class JSII417Derived : JSII417PublicBaseOfBase
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        public JSII417Derived(string property): base(new DeputyProps(new object[]{property}))
        {
        }

        protected JSII417Derived(ByRefValue reference): base(reference)
        {
        }

        protected JSII417Derived(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "bar")]
        public virtual void Bar()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "baz")]
        public virtual void Baz()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        protected virtual string Property
        {
            get => GetInstanceProperty<string>();
        }
    }
}
