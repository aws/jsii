using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(ClassThatImplementsTheInternalInterface), fullyQualifiedName: "jsii-calc.ClassThatImplementsTheInternalInterface")]
    public class ClassThatImplementsTheInternalInterface : DeputyBase, IINonInternalInterface
    {
        public ClassThatImplementsTheInternalInterface(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ClassThatImplementsTheInternalInterface(ByRefValue reference): base(reference)
        {
        }

        protected ClassThatImplementsTheInternalInterface(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string A
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "b", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string B
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "c", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string C
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "d", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string D
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
