using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(AbstractClass), fullyQualifiedName: "jsii-calc.AbstractClass")]
    internal sealed class AbstractClassProxy : AbstractClass
    {
        private AbstractClassProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "abstractProperty", typeJson: "{\"primitive\":\"string\"}")]
        public override string AbstractProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "abstractMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public override string AbstractMethod(string name)
        {
            return InvokeInstanceMethod<string>(new object[]{name});
        }
    }
}