using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    [JsiiInterface(typeof(IGreetee), "jsii-calc.Greetee")]
    public interface IGreetee
    {
        /// <summary>The name of the greetee.</summary>
        /// <remarks>default: world</remarks>
        [JsiiProperty("name", "{\"primitive\":\"string\",\"optional\":true}")]
        string Name
        {
            get;
        }
    }
}