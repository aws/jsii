using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    [JsiiInterface(nativeType: typeof(IGreetee), fullyQualifiedName: "jsii-calc.Greetee")]
    public interface IGreetee
    {
        /// <summary>The name of the greetee.</summary>
        /// <remarks>
        /// default: world
        /// </remarks>
        [JsiiProperty(name: "name", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Name
        {
            get;
        }
    }
}
