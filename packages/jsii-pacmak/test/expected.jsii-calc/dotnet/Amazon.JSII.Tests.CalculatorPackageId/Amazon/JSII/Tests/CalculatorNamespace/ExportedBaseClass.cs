using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(ExportedBaseClass), fullyQualifiedName: "jsii-calc.ExportedBaseClass", parametersJson: "[{\"name\":\"success\",\"type\":{\"primitive\":\"boolean\"}}]")]
    public class ExportedBaseClass : DeputyBase
    {
        public ExportedBaseClass(bool success): base(new DeputyProps(new object[]{success}))
        {
        }

        protected ExportedBaseClass(ByRefValue reference): base(reference)
        {
        }

        protected ExportedBaseClass(DeputyProps props): base(props)
        {
        }

        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        public virtual bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}
