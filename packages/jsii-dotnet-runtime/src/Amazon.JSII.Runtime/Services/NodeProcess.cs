using System;
using System.Diagnostics;
using System.IO;
using Microsoft.Extensions.Logging;

namespace Amazon.JSII.Runtime.Services
{
    public class NodeProcess : INodeProcess
    {
        readonly Process _process;
        readonly ILogger _logger;
        private const string JsiiRuntime = "JSII_RUNTIME";
        private const string JsiiDebug = "JSII_DEBUG";
        private const string JsiiAgent = "JSII_AGENT";

        public NodeProcess(IJsiiRuntimeProvider jsiiRuntimeProvider, ILoggerFactory loggerFactory)
        {
            loggerFactory = loggerFactory ?? throw new ArgumentNullException(nameof(loggerFactory));
            _logger = loggerFactory.CreateLogger<NodeProcess>();

            var runtimePath = Environment.GetEnvironmentVariable(JsiiRuntime);
            if (string.IsNullOrWhiteSpace(runtimePath))
                runtimePath = jsiiRuntimeProvider.JsiiRuntimePath;
            
            _process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "node",
                    Arguments = "--max-old-space-size=4096 " + runtimePath,
                    RedirectStandardInput = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true
                }
            };

            _process.StartInfo.EnvironmentVariables.Add(JsiiAgent, "DotNet/" + Environment.Version);
            
            var debugPath = Environment.GetEnvironmentVariable(JsiiDebug);
            if (!string.IsNullOrWhiteSpace(debugPath))
                _process.StartInfo.EnvironmentVariables.Add(JsiiDebug, debugPath);

            _logger.LogDebug("Starting jsii runtime...");
            _logger.LogDebug($"{_process.StartInfo.FileName} {_process.StartInfo.Arguments}");

            _process.Start();
        }

        public TextWriter StandardInput => _process.StandardInput;

        public TextReader StandardOutput => _process.StandardOutput;

        public TextReader StandardError => _process.StandardError;

        void IDisposable.Dispose()
        {
            StandardInput.Dispose();
            StandardOutput.Dispose();
            StandardError.Dispose();
            _process.Dispose();
        }
    }
}