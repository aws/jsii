using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class ExtendsInternalInterface : IExtendsInternalInterface
    {
        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}", isOverride: true)]
        public bool Boom
        {
            get;
            set;
        }

        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Prop
        {
            get;
            set;
        }
    }
}
