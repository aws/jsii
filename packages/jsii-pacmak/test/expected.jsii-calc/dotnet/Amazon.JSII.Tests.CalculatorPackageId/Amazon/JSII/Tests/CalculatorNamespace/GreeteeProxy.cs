using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>These are some arguments you can pass to a method.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IGreetee), fullyQualifiedName: "jsii-calc.Greetee")]
    internal sealed class GreeteeProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IGreetee
    {
        private GreeteeProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The name of the greetee.</summary>
        /// <remarks>
        /// <strong>Default</strong>: world
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "name", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        public string Name
        {
            get => GetInstanceProperty<string>();
        }
    }
}
