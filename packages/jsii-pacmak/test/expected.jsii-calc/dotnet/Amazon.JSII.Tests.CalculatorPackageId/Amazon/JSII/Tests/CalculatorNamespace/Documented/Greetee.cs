using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Documented
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.documented.Greetee")]
    public class Greetee : Amazon.JSII.Tests.CalculatorNamespace.Documented.IGreetee
    {
        /// <summary>The name of the greetee.</summary>
        /// <remarks>
        /// <strong>Default</strong>: world
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "name", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Name
        {
            get;
            set;
        }
    }
}
