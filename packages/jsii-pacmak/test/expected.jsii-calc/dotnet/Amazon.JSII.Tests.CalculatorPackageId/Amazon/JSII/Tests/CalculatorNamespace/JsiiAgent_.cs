using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Host runtime version should be set via JSII_AGENT.</summary>
    [JsiiClass(typeof(JsiiAgent_), "jsii-calc.JsiiAgent", "[]")]
    public class JsiiAgent_ : DeputyBase
    {
        public JsiiAgent_(): base(new DeputyProps(new object[]{}))
        {
        }

        protected JsiiAgent_(ByRefValue reference): base(reference)
        {
        }

        protected JsiiAgent_(DeputyProps props): base(props)
        {
        }

        /// <summary>Returns the value of the JSII_AGENT environment variable.</summary>
        [JsiiProperty("jsiiAgent", "{\"primitive\":\"string\",\"nullable\":true}")]
        public static string JsiiAgent
        {
            get => GetStaticProperty<string>(typeof(JsiiAgent_));
        }
    }
}