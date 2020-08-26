using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    [JsiiTypeProxy(nativeType: typeof(IGreetee), fullyQualifiedName: "jsii-calc.Greetee")]
    internal sealed class GreeteeProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IGreetee
    {
        private GreeteeProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The name of the greetee.</summary>
        /// <remarks>
        /// <strong>Default</strong>: world
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "name", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string? Name
        {
            get => GetInstanceProperty<string?>();
        }
    }
}
