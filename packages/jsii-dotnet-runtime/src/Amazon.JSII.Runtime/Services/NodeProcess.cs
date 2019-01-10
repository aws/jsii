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

        public NodeProcess(IJsiiRuntimeProvider jsiiRuntimeProvider, ILoggerFactory loggerFactory)
        {
            loggerFactory = loggerFactory ?? throw new ArgumentNullException(nameof(loggerFactory));
            _logger = loggerFactory.CreateLogger<NodeProcess>();

            _process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "node",
                    Arguments = "--max-old-space-size=4096 " + jsiiRuntimeProvider.JsiiRuntimePath,
                    RedirectStandardInput = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true
                }
            };

            _process.StartInfo.EnvironmentVariables.Add("JSII_AGENT", "DotNet/" + Environment.Version);

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