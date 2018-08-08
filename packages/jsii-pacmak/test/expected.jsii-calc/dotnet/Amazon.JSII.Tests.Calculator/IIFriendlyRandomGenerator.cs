using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.Lib;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterface(typeof(IIFriendlyRandomGenerator), "jsii-calc.IFriendlyRandomGenerator")]
    public interface IIFriendlyRandomGenerator : IIRandomNumberGenerator, IIFriendly
    {
    }
}