using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(ExportedBaseClass), fullyQualifiedName: "jsii-calc.ExportedBaseClass", parametersJson: "[{\"name\":\"success\",\"type\":{\"primitive\":\"boolean\"}}]")]
    public class ExportedBaseClass : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
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
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
