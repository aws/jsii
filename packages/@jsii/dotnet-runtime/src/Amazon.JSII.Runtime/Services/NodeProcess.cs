using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Runtime.Versioning;
using System.Text;
using Microsoft.Extensions.Logging;
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class NodeProcess : INodeProcess
    {
        private readonly Process _process;
        private readonly ILogger _logger;
        private const string JsiiRuntime = "JSII_RUNTIME";
        private const string JsiiDebug = "JSII_DEBUG";
        private const string JsiiAgent = "JSII_AGENT";
        private const string JsiiAgentVersionString = "DotNet/{0}/{1}/{2}";
        private bool _disposed = false;

        public NodeProcess(IJsiiRuntimeProvider jsiiRuntimeProvider, ILoggerFactory loggerFactory)
        {
            loggerFactory = loggerFactory ?? throw new ArgumentNullException(nameof(loggerFactory));
            _logger = loggerFactory.CreateLogger<NodeProcess>();

            var runtimePath = Environment.GetEnvironmentVariable(JsiiRuntime);
            if (string.IsNullOrWhiteSpace(runtimePath))
                runtimePath = jsiiRuntimeProvider.JsiiRuntimePath;

            var utf8 = new UTF8Encoding(false /* no BOM */);
            _process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "node",
                    // Always pass --experimental-worker; the flag is ignored by recent node releases (> 12) where the
                    // feature is no longer flagged, so this ought to be safe to do. If it changes in the future, we
                    // can check for whether the option is acceptable or not by consulting the output of the following:
                    // `node -p "process.allowedNodeEnvironmentFlags.has('--experimental-worker')"`. Deciding not to do
                    // this now because the overhead seems excessive.
                    ArgumentList = { "--experimental-worker", "--max-old-space-size=4096", runtimePath },
                    CreateNoWindow = true,
                    UseShellExecute = false,
                    RedirectStandardInput = true,
                    StandardInputEncoding = utf8,
                    RedirectStandardOutput = true,
                    StandardOutputEncoding = utf8,
                    RedirectStandardError = true,
                    StandardErrorEncoding = utf8
                }
            };

            var assemblyVersion = GetAssemblyFileVersion();
            _process.StartInfo.EnvironmentVariables.Add(JsiiAgent,
                string.Format(CultureInfo.InvariantCulture, JsiiAgentVersionString, Environment.Version,
                    assemblyVersion.Item1, assemblyVersion.Item2));

            var debug = Environment.GetEnvironmentVariable(JsiiDebug);
            if (!string.IsNullOrWhiteSpace(debug) && !_process.StartInfo.EnvironmentVariables.ContainsKey(JsiiDebug))
                _process.StartInfo.EnvironmentVariables.Add(JsiiDebug, debug);

            _logger.LogDebug("Starting jsii runtime...");
            _logger.LogDebug($"{_process.StartInfo.FileName} {_process.StartInfo.Arguments}");

            _process.Start();
        }

        public TextWriter StandardInput => _process.StandardInput;

        public TextReader StandardOutput => _process.StandardOutput;

        public TextReader StandardError => _process.StandardError;

        void IDisposable.Dispose()
        {
            if (_disposed)
            {
                return;
            }

            StandardInput.WriteLine("{\"exit\":0}");
            StandardInput.Flush();

            _disposed = true;

            StandardInput.Dispose();

            _process.WaitForExit(5_000);

            StandardOutput.Dispose();
            StandardError.Dispose();

            if (!_process.HasExited)
            {
                try
                {
                    _process.Kill(true);
                }
                catch (InvalidOperationException)
                {
                    // The process had already exited... This is the intended outcome!
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, $"Unable to terminate child process: {ex}");
                }
            }

            _process.Dispose();

            // Reset the Jsii assembly cache, this process can no longer be used!
            JsiiTypeAttributeBase.Reset();
        }

        /// <summary>
        /// Gets the target framework attribute value and
        /// the assembly file version for the current .NET assembly
        /// </summary>
        /// <returns>A tuple where Item1 is the target framework
        /// ie .NETCoreApp,Version=v2.1
        /// and item2 is the assembly file version (ie 1.0.0.0)</returns>
        private static Tuple<string, string> GetAssemblyFileVersion()
        {
            var assembly = typeof(NodeProcess).GetTypeInfo().Assembly;
            var assemblyFileVersionAttribute = assembly.GetCustomAttribute(typeof(AssemblyFileVersionAttribute)) as AssemblyFileVersionAttribute;
            var frameworkAttribute = assembly.GetCustomAttribute(typeof(TargetFrameworkAttribute)) as TargetFrameworkAttribute;
            return new Tuple<string, string>(
                frameworkAttribute?.FrameworkName ?? "Unknown",
                assemblyFileVersionAttribute?.Version ?? "Unknown"
            );
        }
    }
}
