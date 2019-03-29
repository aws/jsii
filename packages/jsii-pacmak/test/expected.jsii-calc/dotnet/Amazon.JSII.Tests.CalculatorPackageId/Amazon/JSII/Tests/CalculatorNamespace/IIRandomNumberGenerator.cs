using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Generates random numbers.</remarks>
    [JsiiInterface(typeof(IIRandomNumberGenerator), "jsii-calc.IRandomNumberGenerator")]
    public interface IIRandomNumberGenerator
    {
        /// <remarks>
        /// returns: A random number.
        /// summary: Returns another random number.
        /// </remarks>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        double Next();
    }
}