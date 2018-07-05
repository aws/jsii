using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;

namespace AWS.Jsii.Runtime.Services
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
                }
            };

            _logger.LogDebug("Starting jsii runtime...");
            _logger.LogDebug($"{_process.StartInfo.FileName} {_process.StartInfo.Arguments}");

            _process.Start();
        }

        public StreamWriter StandardInput => _process.StandardInput;

        public StreamReader StandardOutput => _process.StandardOutput;

        void IDisposable.Dispose()
        {
            _process.Dispose();
        }
    }
}
