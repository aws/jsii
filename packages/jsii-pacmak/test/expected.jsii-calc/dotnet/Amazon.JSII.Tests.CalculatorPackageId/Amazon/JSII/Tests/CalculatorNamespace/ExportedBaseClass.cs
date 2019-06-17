using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(ExportedBaseClass), fullyQualifiedName: "jsii-calc.ExportedBaseClass", parametersJson: "[{\"name\":\"success\",\"type\":{\"primitive\":\"boolean\"}}]")]
    public class ExportedBaseClass : DeputyBase
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        public ExportedBaseClass(bool success): base(new DeputyProps(new object[]{success}))
        {
        }

        protected ExportedBaseClass(ByRefValue reference): base(reference)
        {
        }

        protected ExportedBaseClass(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
