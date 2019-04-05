using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Generates random numbers.</summary>
    [JsiiInterface(typeof(IIRandomNumberGenerator), "jsii-calc.IRandomNumberGenerator")]
    public interface IIRandomNumberGenerator
    {
        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        [JsiiMethod("next", "{\"type\":{\"primitive\":\"number\"}}", "[]")]
        double Next();
    }
}