using System;
using System.IO;

namespace AWS.Jsii.Runtime.Services
{
    public class JsiiRuntimeProvider : IJsiiRuntimeProvider
    {
        public JsiiRuntimeProvider()
        {
            string devOverride = Environment.GetEnvironmentVariable("__DEV_CDK_ROOT");

            JsiiRuntimePath = string.IsNullOrWhiteSpace(devOverride) ?
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".cdk", "node_modules") :
                devOverride;
        }

        public string JsiiRuntimePath { get; }
    }
}
