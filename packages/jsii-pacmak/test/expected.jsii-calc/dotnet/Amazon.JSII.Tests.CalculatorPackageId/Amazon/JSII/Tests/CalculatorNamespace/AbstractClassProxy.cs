using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AbstractClass), fullyQualifiedName: "jsii-calc.AbstractClass")]
    internal sealed class AbstractClassProxy : Amazon.JSII.Tests.CalculatorNamespace.AbstractClass
    {
        private AbstractClassProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "abstractProperty", typeJson: "{\"primitive\":\"string\"}")]
        public override string AbstractProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "abstractMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public override string AbstractMethod(string name)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string)}, new object[]{name});
        }
    }
}
