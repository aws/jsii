using AWS.Jsii.Runtime.Services;
using System.IO;

namespace AWS.Jsii.Runtime.IntegrationTests
{
    public class JsiiRuntimeProvider : IJsiiRuntimeProvider
    {
        // <root>/packages/
        public string JsiiRuntimePath => Path.Combine("..", "..", "..", "..", "..", "..");
    }
}
