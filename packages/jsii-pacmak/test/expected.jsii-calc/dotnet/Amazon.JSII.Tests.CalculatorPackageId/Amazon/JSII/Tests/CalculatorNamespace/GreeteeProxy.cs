using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: These are some arguments you can pass to a method.</remarks>
    [JsiiTypeProxy(typeof(IGreetee), "jsii-calc.Greetee")]
    internal sealed class GreeteeProxy : DeputyBase, IGreetee
    {
        private GreeteeProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// default: world
        /// summary: The name of the greetee.
        /// </remarks>
        [JsiiProperty("name", "{\"primitive\":\"string\",\"optional\":true}")]
        public string Name
        {
            get => GetInstanceProperty<string>();
        }
    }
}