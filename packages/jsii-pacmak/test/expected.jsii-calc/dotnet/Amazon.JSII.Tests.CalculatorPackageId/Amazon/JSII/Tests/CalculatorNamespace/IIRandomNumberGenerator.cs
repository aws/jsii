using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Generates random numbers.</summary>
    [JsiiInterface(nativeType: typeof(IIRandomNumberGenerator), fullyQualifiedName: "jsii-calc.IRandomNumberGenerator")]
    public interface IIRandomNumberGenerator
    {
        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        [JsiiMethod(name: "next", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        double Next();
    }
}
