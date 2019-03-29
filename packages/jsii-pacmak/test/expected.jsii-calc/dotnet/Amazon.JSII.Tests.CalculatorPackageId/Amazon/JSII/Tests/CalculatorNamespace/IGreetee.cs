using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: These are some arguments you can pass to a method.</remarks>
    [JsiiInterface(typeof(IGreetee), "jsii-calc.Greetee")]
    public interface IGreetee
    {
        /// <remarks>
        /// default: world
        /// summary: The name of the greetee.
        /// </remarks>
        [JsiiProperty("name", "{\"primitive\":\"string\",\"optional\":true}")]
        string Name
        {
            get;
        }
    }
}