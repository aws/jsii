using Amazon.JSII.Tests.Calculator.Lib;
using AWS.Jsii.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterface(typeof(IIFriendlyRandomGenerator), "jsii-calc.IFriendlyRandomGenerator")]
    public interface IIFriendlyRandomGenerator : IIRandomNumberGenerator, IIFriendly
    {
    }
}