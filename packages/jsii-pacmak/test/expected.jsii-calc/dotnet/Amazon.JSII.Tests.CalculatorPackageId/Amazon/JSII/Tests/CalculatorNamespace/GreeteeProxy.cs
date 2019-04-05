using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    [JsiiTypeProxy(typeof(IGreetee), "jsii-calc.Greetee")]
    internal sealed class GreeteeProxy : DeputyBase, IGreetee
    {
        private GreeteeProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The name of the greetee.</summary>
        /// <remarks>default: world</remarks>
        [JsiiProperty("name", "{\"type\":{\"primitive\":\"string\"},\"optional\":true}")]
        public string Name
        {
            get => GetInstanceProperty<string>();
        }
    }
}