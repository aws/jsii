using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>Generates random numbers.</summary>
    [JsiiInterface("jsii-calc", "jsii$jsii_calc$.IRandomNumberGenerator")]
    public interface IIRandomNumberGenerator
    {
        /// <summary>Returns another random number.</summary>
        /// <returns>A random number.</returns>
        [JsiiMethod("next", "{\"primitive\":\"number\"}", "[]")]
        double Next();
    }
}