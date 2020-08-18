using System;
using System.Threading.Tasks;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class Runtime : IRuntime
    {
        readonly INodeProcess _nodeProcess;

        public Runtime(INodeProcess nodeProcess)
        {
            _nodeProcess = nodeProcess ?? throw new ArgumentNullException(nameof(nodeProcess));
            if (Environment.GetEnvironmentVariable("JSII_DEBUG") != null)
            {
                Task.Run(() => RedirectStandardError());
            }
        }

        public string ReadResponse()
        {
            var response = _nodeProcess.StandardOutput.ReadLine();
            if (string.IsNullOrEmpty(response))
            {
                var errorMessage = _nodeProcess.StandardError.ReadToEnd();
                throw new JsiiException("Child process exited unexpectedly: " + errorMessage);
            }

            return response;
        }

        public void WriteRequest(string request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (request.Contains(Environment.NewLine, StringComparison.InvariantCulture))
            {
                throw new ArgumentException("All requests must be single-line", nameof(request));
            }

            _nodeProcess.StandardInput.WriteLine(request);
            _nodeProcess.StandardInput.Flush();
        }

        private void RedirectStandardError()
        {
            while (true)
            {
                Console.Error.WriteLine(_nodeProcess.StandardError.ReadLine());
            }
        }
    }
}
