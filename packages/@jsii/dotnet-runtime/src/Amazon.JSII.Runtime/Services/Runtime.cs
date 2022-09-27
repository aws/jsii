using System;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class Runtime : IRuntime
    {
        readonly INodeProcess _nodeProcess;

        public Runtime(INodeProcess nodeProcess)
        {
            _nodeProcess = nodeProcess ?? throw new ArgumentNullException(nameof(nodeProcess));
        }

        public string ReadResponse()
        {
            var response = _nodeProcess.StandardOutput.ReadLine();
            if (string.IsNullOrEmpty(response))
            {
                throw new JsiiError("Child process exited unexpectedly!");
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
    }
}
