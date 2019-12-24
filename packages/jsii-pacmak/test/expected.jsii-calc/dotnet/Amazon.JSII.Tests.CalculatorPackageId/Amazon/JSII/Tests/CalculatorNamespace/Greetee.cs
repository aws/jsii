using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.Greetee")]
    public class Greetee : Amazon.JSII.Tests.CalculatorNamespace.IGreetee
    {
        /// <summary>The name of the greetee.</summary>
        /// <remarks>
<<<<<<< HEAD
        /// <strong>Default</strong>: world
        /// 
        /// <strong>Stability</strong>: Experimental
=======
        /// default:
        /// world
        /// 
        /// stability: Experimental
>>>>>>> origin/master
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "name", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Name
        {
            get;
            set;
        }
    }
}
