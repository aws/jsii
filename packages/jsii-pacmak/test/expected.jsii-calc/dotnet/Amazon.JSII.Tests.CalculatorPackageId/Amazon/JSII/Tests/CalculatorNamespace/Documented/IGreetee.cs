using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Documented
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IGreetee), fullyQualifiedName: "jsii-calc.documented.Greetee")]
    public interface IGreetee
    {
        /// <summary>The name of the greetee.</summary>
        /// <remarks>
        /// <strong>Default</strong>: world
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "name", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string? Name
        {
            get
            {
                return null;
            }
        }
    }
}
