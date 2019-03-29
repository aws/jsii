using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: These are some arguments you can pass to a method.</remarks>
    [JsiiByValue]
    public class Greetee : IGreetee
    {
        /// <remarks>
        /// default: world
        /// summary: The name of the greetee.
        /// </remarks>
        [JsiiProperty("name", "{\"primitive\":\"string\",\"optional\":true}", true)]
        public string Name
        {
            get;
            set;
        }
    }
}