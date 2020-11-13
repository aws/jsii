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
            _process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "node",
                    Arguments = $"--max-old-space-size=4096 {runtimePath}",
                    RedirectStandardInput = true,
                    StandardInputEncoding = utf8,
                    RedirectStandardOutput = true,
                    StandardOutputEncoding = utf8,
                    UseShellExecute = false,
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

        ~NodeProcess() {
            ((IDisposable)this).Dispose();
        }

        public TextWriter StandardInput => AssertNotDisposed(_process).StandardInput;

        public TextReader StandardOutput => AssertNotDisposed(_process).StandardOutput;

        [MethodImpl(MethodImplOptions.Synchronized)]
        void IDisposable.Dispose()
        {
            if (Disposed) return;

            // Closing the jsii Kernel's STDIN is how we instruct it to shut down
            StandardInput.Close();
            // Give the kernel 5 seconds to clean up after itself
            _process.WaitForExit(5_000);

            // Dispose of the process (terminating it if needed)
            _process.Dispose();
            // Record that this NodeProcess was disposed of.
            Disposed = true;

            // If Dispose() was called manually, there is no need to run the finalizer anymore,
            // since it only calls Dispose(). So we inform the GC about this.
            GC.SuppressFinalize(this);
        }

        private T AssertNotDisposed<T>(T value)
        {
            if (Disposed)
            {
                throw new InvalidOperationException($"This {nameof(NodeProcess)} was already Disposed of!");
            }
            return value;
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
