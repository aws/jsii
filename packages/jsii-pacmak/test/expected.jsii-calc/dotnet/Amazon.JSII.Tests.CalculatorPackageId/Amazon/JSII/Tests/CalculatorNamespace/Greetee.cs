using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue]
    public class Greetee : Amazon.JSII.Tests.CalculatorNamespace.IGreetee
    {
        /// <summary>The name of the greetee.</summary>
        /// <remarks>
        /// default:
        /// world
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "name", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Name
        {
            get;
            set;
        }
    }
}
