using System;

namespace Amazon.JSII.Runtime.Services
{
    public class Runtime : IRuntime
    {
        readonly INodeProcess _nodeProcess;

        public Runtime(INodeProcess nodeProcess)
        {
            _nodeProcess = nodeProcess ?? throw new ArgumentNullException(nameof(nodeProcess));
        }

        public string ReadResponse()
        {
            return _nodeProcess.StandardOutput.ReadLine();
        }

        public void WriteRequest(string request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (request.Contains(Environment.NewLine))
            {
                throw new ArgumentException("All requests must be single-line", nameof(request));
            }

            _nodeProcess.StandardInput.WriteLine(request);
            _nodeProcess.StandardInput.Flush();
        }
    }
}
