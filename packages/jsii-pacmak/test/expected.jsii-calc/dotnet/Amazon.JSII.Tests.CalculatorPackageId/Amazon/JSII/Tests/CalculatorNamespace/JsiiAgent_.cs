using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Host runtime version should be set via JSII_AGENT.</remarks>
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

        /// <remarks>summary: Returns the value of the JSII_AGENT environment variable.</remarks>
        [JsiiProperty("jsiiAgent", "{\"primitive\":\"string\",\"optional\":true}")]
        public static string JsiiAgent
        {
            get => GetStaticProperty<string>(typeof(JsiiAgent_));
        }
    }
}