using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    [JsiiByValue]
    public class Greetee : IGreetee
    {
        /// <summary>The name of the greetee.</summary>
        /// <remarks>default: world</remarks>
        [JsiiProperty("name", "{\"type\":{\"primitive\":\"string\"},\"optional\":true}", true)]
        public string Name
        {
            get;
            set;
        }
    }
}