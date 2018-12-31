using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ExportedBaseClass), "jsii-calc.ExportedBaseClass", "[{\"name\":\"success\",\"type\":{\"primitive\":\"boolean\"}}]")]
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

        [JsiiProperty("success", "{\"primitive\":\"boolean\"}")]
        public virtual bool Success
        {
            get => GetInstanceProperty<bool>();
        }
    }
}