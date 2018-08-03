using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>Generates random numbers.</summary>
    [JsiiInterface(typeof(IIRandomNumberGenerator), "jsii-calc.IRandomNumberGenerator")]
    public interface IIRandomNumberGenerator
    {
        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        double Next();
    }
}