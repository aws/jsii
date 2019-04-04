using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    [JsiiByValue]
    public class Greetee : IGreetee
    {
        /// <summary>The name of the greetee.</summary>
        /// <remarks>default: world</remarks>
        [JsiiProperty("name", "{\"primitive\":\"string\",\"nullable\":true}", true)]
        public string Name
        {
            get;
            set;
        }
    }
}