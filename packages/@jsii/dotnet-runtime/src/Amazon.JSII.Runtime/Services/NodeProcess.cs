using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.Versioning;
using System.Text;
using Microsoft.Extensions.Logging;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class NodeProcess : INodeProcess
    {
        readonly Process _process;
        readonly ILogger _logger;

        private const string JsiiRuntime = "JSII_RUNTIME";
        private const string JsiiDebug = "JSII_DEBUG";
        private const string JsiiAgent = "JSII_AGENT";
        private const string JsiiAgentVersionString = "DotNet/{0}/{1}/{2}";

        private bool Disposed = false;

        public NodeProcess(IJsiiRuntimeProvider jsiiRuntimeProvider, ILoggerFactory loggerFactory)
        {
            loggerFactory = loggerFactory ?? throw new ArgumentNullException(nameof(loggerFactory));
            _logger = loggerFactory.CreateLogger<NodeProcess>();

            var runtimePath = Environment.GetEnvironmentVariable(JsiiRuntime);
            if (string.IsNullOrWhiteSpace(runtimePath))
                runtimePath = jsiiRuntimeProvider.JsiiRuntimePath;

            var utf8 = new UTF8Encoding(false /* no BOM */);
            var startInfo = new ProcessStartInfo
            {
                FileName = "node",
                Arguments = $"--max-old-space-size=4096 {runtimePath}",
                RedirectStandardInput = true,
                StandardInputEncoding = utf8,
                RedirectStandardOutput = true,
                StandardOutputEncoding = utf8,
                UseShellExecute = false,
            };

            var assemblyVersion = GetAssemblyFileVersion();
            startInfo.EnvironmentVariables.Add(JsiiAgent,
                string.Format(CultureInfo.InvariantCulture, JsiiAgentVersionString, Environment.Version,
                    assemblyVersion.Item1, assemblyVersion.Item2));

            var debug = Environment.GetEnvironmentVariable(JsiiDebug);
            if (!string.IsNullOrWhiteSpace(debug) && !startInfo.EnvironmentVariables.ContainsKey(JsiiDebug))
                startInfo.EnvironmentVariables.Add(JsiiDebug, debug);

            _logger.LogDebug("Starting jsii runtime...");
            _logger.LogDebug($"{startInfo.FileName} {startInfo.Arguments}");

            // Registering shutdown hook to have JS process gracefully terminate.
            AppDomain.CurrentDomain.ProcessExit += (snd, evt) => {
                ((IDisposable)this).Dispose();
            };

            _process = Process.Start(startInfo);

            StandardInput = _process.StandardInput;
            StandardOutput = _process.StandardOutput;
        }

        public TextWriter StandardInput { get; }

        public TextReader StandardOutput { get; }

        [MethodImpl(MethodImplOptions.Synchronized)]
        void IDisposable.Dispose()
        {
            if (Disposed) return;

            Disposed = true;

            // If the child process has already exited, we simply need to dispose of it
            if (_process.HasExited)
            {
                _process.Dispose();
                return;
            }

            // Closing the jsii Kernel's STDIN is how we instruct it to shut down
            StandardInput.Close();

            try
            {
                // Give the kernel 5 seconds to clean up after itself
                if (!_process.WaitForExit(5_000)) {
                    // Kill the child process if needed
                    _process.Kill();
                }
            }
            catch (InvalidOperationException)
            {
                // This means the process had already exited, because it was faster to clean up
                // than we were to process it's termination. We still re-check if the process has
                // exited and re-throw if not (meaning it was a different issue).
                if (!_process.HasExited)
                {
                    throw;
                }
            }
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
