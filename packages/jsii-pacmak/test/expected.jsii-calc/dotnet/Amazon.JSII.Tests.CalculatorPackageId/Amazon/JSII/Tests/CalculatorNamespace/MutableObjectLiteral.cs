using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    public class MutableObjectLiteral : DeputyBase, IMutableObjectLiteral
    {
        [JsiiProperty("value", "{\"primitive\":\"string\"}", true)]
        public string Value
        {
            get;
            set;
        }
    }
}